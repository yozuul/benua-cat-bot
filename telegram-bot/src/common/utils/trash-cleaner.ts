export async function cleanTrash(tg_id, ctx) {
   if(!ctx.session?.trash) {
      ctx.session.trash = []
      return
   }
   if(ctx.session.trash?.length > 0) {
      ctx.session.trash.map(async (msgId) => {
         try {
            await ctx.telegram.deleteMessage(tg_id, msgId)
         } catch (error) {
            console.log('Ошибка удаления сообщения')
         }
      })
   }
   ctx.session.trash = []
}