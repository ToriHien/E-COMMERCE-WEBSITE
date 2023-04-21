    //Lấy giá trị key từ Local Storage khi loading lại trang web
    export const getKeyLocalStore=(key,initialValue,message,action) => {
        if(!localStorage.hasOwnProperty(key)){ //Nếu người dùng chưa có key Local Storage thì tạo key 
            localStorage.setItem(key,initialValue);
        } 
        if(localStorage.key===undefined){
            localStorage.setItem(key,initialValue);
        }
        else {return action}; //nếu có dữ liệu rồi thì thực thi lệnh
        
    }