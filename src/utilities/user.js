const users=[]
const adduser=({id,username,room})=>{
    username=username
    room=room

if(!username||!room)
{
    return 'error:-usename and room are mandatory!!'
}
const preuser=users.forEach((user)=>{
    if( user.room===room&&user.username===username)
    {
        return 'user already a part of discussion!!'
    }
})
const user={id,username,room}
users.push(user)
return {user}
}

const remuser=(id)=>{
    const index=users.findIndex((user)=>user.id===id)
    if(index!==-1){
        return users.splice(index,1)[0]
    }
}
const getuser=(id)=>{
     return users.find((user)=>user.id=id)
}
const userinroom=(room)=>{
    return users.filter((user)=>user.room===room)
}
module.exports={
    adduser,
    remuser,
    getuser,
    userinroom 
}
    