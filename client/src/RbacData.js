let PermissionList;
export function getData(){
    if(PermissionList){
        return PermissionList ;
    } else {
        PermissionList = JSON.parse(localStorage.getItem('permissions'));
        return PermissionList;
    }
}
export function setData(data){
    PermissionList = data;
}