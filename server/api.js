

async function upload(ctx,next){
    let crb = ctx.request.body;

    ctx.body = B.jsonStr({
        status: 'success',
        respCode: '0',
        data: {
        }
    })
}

module.exports = {
    upload
}