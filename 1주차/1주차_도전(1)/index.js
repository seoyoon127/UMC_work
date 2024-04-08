window.onload = function() {
    var userName;
    var email;
    var age;
    var password;
    var passwordCheck;
    var userName_error;
    var email_error;
    var age_error;
    var password_error;
    var passwordCheck_error;
    var join_button;

    var modal=document.querySelector(".modal");
    function getData(){ //데이터 받아오기
        userName=document.getElementById("userName").value;
        email=document.getElementById("email").value;
        age=document.getElementById("age").value;
        password=document.getElementById("password").value;
        passwordCheck=document.getElementById("passwordCheck").value;
        userName_error=document.getElementById("userName_error");
        email_error=document.getElementById("email_error");
        age_error=document.getElementById("age_error");
        password_error=document.getElementById("password_error");
        passwordCheck_error=document.getElementById("passwordCheck_error");
        join_button=document.getElementById("join_button");
    }
   
    getData();//미리 선언해야 join_button 실행됨^^..
    join_button.onclick=function(){ //가입하기 버튼이 클릭됐을 때
        var join=0;
        getData(); 
        //이름
        if (userName.trim() === ""){
            userName_error.innerHTML="필수입력 항목입니다.";
            document.getElementsByClassName('textAlert')[0].style.color='red';
        }else{
            userName_error.innerHTML="멋진 이름이네요!";
            document.getElementsByClassName('textAlert')[0].style.color='green';
            join+=1;
        }
        //이메일
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            email_error.innerHTML="올바른 이메일 형식입니다";
            document.getElementsByClassName('textAlert')[1].style.color='green';
            join+=1;
        }else{
            email_error.innerHTML="올바른 이메일 형식이 아닙니다";
            document.getElementsByClassName('textAlert')[1].style.color='red';
        }
        //나이
        getData();
        age=Number(age);
        if (isNaN(age)){
            age_error.innerHTML="나이는 숫자 형식이어야 합니다.";
            document.getElementsByClassName('textAlert')[2].style.color='red';
        }else if(age<0){
            age_error.innerHTML="나이는 음수가 될 수 없습니다.";
            document.getElementsByClassName('textAlert')[2].style.color='red';
        }else if(!Number.isInteger(age)){
            age_error.innerHTML="나이는 소수가 될 수 없습니다.";
            document.getElementsByClassName('textAlert')[2].style.color='red';
        }else if(age<19){
            age_error.innerHTML="미성년자는 가입할 수 없습니다.";
            document.getElementsByClassName('textAlert')[2].style.color='red';
        }else{
            age_error.innerHTML="올바른 나이 형식입니다.";
            document.getElementsByClassName('textAlert')[2].style.color='green';
            join+=1;
        }
        //비밀번호
        const REGPASSSWORD = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,20}$/;
        if (password.length<4 ){
            password_error.innerHTML="비밀번호는 4글자 이상이어야 합니다.";
            document.getElementsByClassName('textAlert')[3].style.color='red';
        }else if(password.length>12){
            password_error.innerHTML="비밀번호는 12글자 이하여야 합니다.";
            document.getElementsByClassName('textAlert')[3].style.color='red';
        }else if(!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password)){
            password_error.innerHTML="영어, 숫자, 특수문자를 모두 조합해서 비밀번호를 작성해야 합니다.";
            document.getElementsByClassName('textAlert')[3].style.color='red';
        }else{
            password_error.innerHTML="올바른 비밀번호 입니다.";
            document.getElementsByClassName('textAlert')[3].style.color='green';
            join+=1;
        }
        //비밀번호 확인
        if (passwordCheck!==password){
            passwordCheck_error.innerHTML="비밀번호가 일치하지 않습니다."
            document.getElementsByClassName('textAlert')[4].style.color='red';
        }else{
            passwordCheck_error.innerHTML="비밀번호가 일치합니다."
            document.getElementsByClassName('textAlert')[4].style.color='green';
            join+=1;
        }
        var userNameCorrect=/^[a-zA-Z\uAC00-\uD7A3]+$/.test(userName);
        var emailCorrect=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        var ageCorrect=!isNaN(age) && age !== "" && age % 1 === 0 && age >= 19;
        var passwordCorrect= password.length >= 4 && password.length <= 12 &&/[a-zA-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password);
        var passwordCheckCorrect=password===passwordCheck;
        //모달
        if (userNameCorrect&&emailCorrect&&ageCorrect&&passwordCorrect&&passwordCheckCorrect){
            modal.style.display="flex";
        }
    };
    var close=document.getElementById("close")
    close.onclick=()=>{
        modal.style.display="none";
    }
};
