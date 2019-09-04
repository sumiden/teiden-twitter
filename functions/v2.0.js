
/*
logicappと連携
gmailトリガー
2017/10/21 18:49時点
xxx
xxx
xxx
*/

module.exports = function (context, req) {

    var counter = function(str,seq){
        return str.split(seq).length - 1;
    }
    
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log("req: "+JSON.stringify(req));

    var tmp = req.body.split("\r\n\r\n");
    var time = tmp[0].substr(11,5);
    var area = tmp[1];

    context.log("time: "+time);
    context.log("area: "+area);

    var body = time+"時点、以下の地域が停電しています。\r\n\r\n"+area;

    var bodylength = body.length - counter(body,"\r\n");
    context.log("bodylength1: "+bodylength);

    if(bodylength > 140) {
        context.log("140unfix: "+body);
        var body1 = body.substring(0,139);
        var end = 139 + counter(body1,"\r\n");
        var body2 = body.substring(0,end);
        var end = 139 + counter(body2,"\r\n");
        body = body.substring(0,end) + "…";

        bodylength = body.length - counter(body,"\r\n");
        context.log(body.length);
        context.log("bodylength2: "+bodylength);
        context.log("140fix: "+body);
    }

    context.res = {
    // status: 200, /* Defaults to 200 */
    body: body
    };
    
    context.done();
};
