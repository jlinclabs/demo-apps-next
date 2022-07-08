
export default defineResource => {
  defineResource('chat/channels', {
    getValue(ctx){
      ctx.userId
      return {
        FAKE_CHAT_CHANNELS: 99,
      }
    },
    onChange(){

    },
  })

  defineResource('chat/channel/:id', {

  })
}
