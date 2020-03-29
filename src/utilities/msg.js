const generatemsg=(username,text)=>
{
 return  {
     username,
text,
time: new Date().getTime()
}}
const genlocmsg=(username,url)=>{
    return{
        username,
        url,
        time:new Date().getTime()
    }
}
module.exports={generatemsg,genlocmsg}
