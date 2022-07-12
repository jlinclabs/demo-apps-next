import { Client } from 'pg'
import parseDbUrl from 'parse-database-url'

const config = parseDbUrl(process.env.DATABASE_URL)
console.log({ config })
const client = new Client(config)
const tableNames = ['User', 'Session']
const ready = (async () => {
  await client.connect()
  await client.query(`
    CREATE OR REPLACE FUNCTION notify_change() RETURNS TRIGGER AS $$
      BEGIN
        PERFORM pg_notify('change_events', NEW::JSON);
        RETURN NEW;
      END;
    $$ LANGUAGE plpgsql;
  `)
  for (const tableName of tableNames){
    await client.query(`
      DROP TRIGGER IF EXISTS "${tableName}_change" on "${tableName}";
      CREATE TRIGGER "${tableName}_change"
        AFTER INSERT OR UPDATE OR DELETE ON "${tableName}"
        FOR EACH ROW EXECUTE PROCEDURE notify_change();
    `)
  }
  await client.query("LISTEN change_events")
  client.on('notification', msg => {
    console.log('PG notification', msg.channel)
    console.log('PG notification', msg.payload)
  })
  // UNLISTEN change_events
})()

export { client }

export async function watchQuery(){
  await ready()

}
