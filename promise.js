// var p1 = new Promise(
//     function(resolve, reject) {
//         console.log("프라미스 함수제작");
//         //0.5초 뒤에 콘솔에 찍습니다.
//         setTimeout(
//             function() {
//                 //프라미스 이행 될때 실행할 부분을 resolve로 적습니다.
//                 // resolve( console.log("프라미스 이행") );
//                 //리턴할 변수를 적는다.
//                 resolve({ p1 : "^_^" });
//             }, 500 );
//     }
// );

// p1.then( (result)=>{
//     console.log("리턴 값을 출력해본다 : " + result.p1);
// });

var p1 = new Promise(
    function(resolve, reject) {
        //0.5초 뒤에 콘솔에 찍습니다.
        setTimeout(
            function() {
                resolve({ p1 : "^_^" });
            }, 500 );
    }
);

var p2 = new Promise(
    function(resolve, reject) {
        console.log("프라미스 함수제작");
        //0.3초 뒤에 콘솔에 찍습니다.
        setTimeout(
            function() {
                resolve({ p2 : "-_-" });
            }, 300 );
    }
);

Promise.all([p1,p2]).then( (result) =>{
    console.log(result);
    console.log( "p1 = " + result[0].p1);
    console.log( "p2 = " + result[1].p2);
});