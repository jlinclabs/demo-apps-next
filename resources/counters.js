const counters = {
  queries: {

  },

  commands: {
    inc({ id }){

    },
    dec({ id }){

    },
  },

  actions: {
    create(){
      return {}
    },
    inc({ id }){
      return counters.commands.inc({ id })
    },
    dec({ id }){
      return counters.commands.dec({ id })
    },
    destroy(){
      return {}
    },
  },

  views: {
    'mine': async ({ currentUser }) => {
      return []
    },
    ':id': async ({ id }) => {
      return {
        count: 42,
      }
    }
  }
}


export default counters
