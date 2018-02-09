/*
LogicAppと連携して利用
長野県
静岡県
*/


module.exports = function (context, data) {
    //context.log(data.body);

    var parseString = require('xml2js').parseString;
    var xml = data.body;
    var area = [];
    var kosu = [];
    var kosu2;
    var result = [];
    var answer = "";

    parseString(xml, function (err, res) {

        //context.log("res: "+JSON.stringify(res.teiden_info.area[0]));
        var data = res.teiden_info.area;
        context.log(JSON.stringify(res));

        //停電有無判定
        if(res.teiden_info == "\r\n"){

            context.log("no teiden")
        }else{

            job(data);
        }
        context.log("answer: "+answer);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: answer    
        }
    });

    context.log(answer);
    context.done();

    function job(data,res) {

        for(let i = 0; i < data.length; i++) {

            area[i] = data[i].address[0];
            kosu[i] = data[i].genzai_teiden_kosu[0];

            //停電戸数判定
            kosu2 = data[i].genzai_teiden_kosu[0].replace(/[^0-9]/g, "");
            if(Number(kosu2) >= 1){

                context.log(kosu2);
                context.log(">threshold");

                //戸数ありver
                //result[i] = area[i]+":"+kosu[i];
                
                //戸数なしver
                result[i] = area[i];

                answer += result[i]+"\r\n";
            }
        }
    }
}
