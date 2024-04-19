console.log("board_detail.js.in");
console.log(bnoVal);

document.getElementById('cmtAddBtn').addEventListener('click',()=>{
    let cmtText=document.getElementById('cmtText').value;
    const cmtWriter=document.getElementById('cmtWriter').value;
    if(cmtText==null||cmtText==''){
        alert("댓글을 입력해주세요");
        return false;
    }else{
        //댓글등록
        let cmtData={
            bno:bnoVal,
            writer:cmtWriter,
            content:cmtText
        };
        //댓글 비동기로 전송

        postCommentToServer(cmtData).then(result=>{
            console.log(result);
			if(result==='1'){
				alert("댓글등록성공");
				document.getElementById('cmtText').value="";
			}
            //댓글출력
            printCommentList(bnoVal);
           
        })
    }
})

async function postCommentToServer(cmtData){
    try {
        //method,heards,body
        const url="/cmt/post"
        const config={
            method:"post",
            headers:{
                'Content-Type':'application/json: charset=utf-8'
            },
            body:JSON.stringify(cmtData)
        };
        
        const resp=await fetch(url,config)
        const result=await resp.text();//isOK
        return result;

    } catch (error) {
        console.log(error);
    }
}
function spreadCommentList(result){ //댓글 리스트
    console.log(result);
    let div=document.getElementById('commentLine');
    div.innerText=''; //원래 만들어두웠던 구조 지우기
    for(let i=0; i<result.length; i++){
        let html=`<div>`;
        html+=`<div>${result[i].cno},${result[i].bno},${result[i].writer},${result[i].regdate}</div>`;
        html+=`<div>`;
        html+=`<input type="text" class="cmtText" value="${result[i].content}">`;
        if(id===result[i].writer){

            html+=`<button type="button" data-cno=${result[i].cno} class="cmtModBtn">수정</button>`;
            html+=`<button type="button" data-cno=${result[i].cno} class="cmtDelBtn">삭제</button><br>`;
        }
        html+=`</div></div><hr>`
        div.innerHTML+=html;//각 댓글을 누적하여 담기
    }
}
//댓글리스트 요청
async function getCommentListFromServer(bno){
try {
    const resp=await fetch("/cmt/list?bno="+bno)
    const result=await resp.json(); //[{...},{...},{...}]
    return result;
} catch (error) {
    console.log(error);
}
}
//호출
function printCommentList(bno){
    getCommentListFromServer(bno).then(result=>{
        console.log(result);
        if(result.length>0){
            spreadCommentList(result);
        }else{
            let div=document.getElementById("commentLine")
            div.innerHTML=`<div>comment가 없습니다.</div>`
        }
    })
}

//수정에 대한 게시글 :cno content=>result =>post와 비슷하게
async function updateCommentServer(cmtData){
    try {
        const url="/cmt/modify"
        const config={
            method:"post",
            headers:{
                'Content-Type':'application/json; charset=utf-8' 
            },
            body:JSON.stringify(cmtData)
        }
        const resp=await fetch(url,config)
        const result=await resp.text();//isOK
        return result
        
    } catch (error) {
        console.log(error);
    }
}
//삭제 cno =>result isOk=>list
async function removeCommentServer(cnoVal){
    try {
        const resp=await fetch("/cmt/remove?cno="+cnoVal)
        const result=await resp.text();
        return result;
    } catch (error) {
        
    }

}

document.addEventListener('click',(e)=>{
    console.log(e.target);
    //삭제 버튼일 경우
    if(e.target.classList.contains('cmtDelBtn')){
        let cnoVal=e.target.dataset.cno;
        console.log(cnoVal);
        removeCommentServer(cnoVal).then(result=>{
            if(result==='1'){
                alert("댓글삭제성공");
                printCommentList(bnoVal);

            }
        })
    }
    //수정버튼일경우
if(e.target.classList.contains('cmtModBtn')){
    let cnoVal=e.target.dataset.cno;
    console.log(cnoVal);
    //내 타겟을 기준으로 가장 가까운 div를 찾는다
    let div=e.target.closest('div');
    console.log(div);
    let cmtText=div.querySelector('.cmtText').value;
    console.log(cmtText);
    let cmtData={
        cno:cnoVal,
        content:cmtText

    }
    updateCommentServer(cmtData).then(result=>{
        if(result==='1'){
            alert("댓글수정 성공");
            printCommentList(bnoVal);
        }
    })
}
})




