const socket=io()
const MESSAGEFORM=document.querySelector('#message-form')
const MEASSAGEFORMINPUT=MESSAGEFORM.querySelector('input')
const MESSAGEFORMBUTTON=MESSAGEFORM.querySelector('button')
const MESSAGE=document.querySelector('#your-text')
const MESSAGETEMPLATE=document.querySelector('#message-template').innerHTML
const LOCATIONTEMPLATE=document.querySelector('#location-template').innerHTML
const sidetemplate=document.querySelector('#side-template').innerHTML
const {username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})

socket.on('message',(message)=>{
  console.log(message)
  const html=Mustache.render(MESSAGETEMPLATE,{
    username:message.username,
    text:message.text,
    
    time:moment(message.time).format('h:mm a')}
  )
  MESSAGE.insertAdjacentHTML('beforeend',html)
  function pageScroll() {
    window.scrollBy(0,50);
    scrolldelay = setTimeout(pageScroll,10);
}
})

socket.on('ADDHA',(url)=>
{
  console.log(url)
  const html=Mustache.render(LOCATIONTEMPLATE,{
    username:url.username,
    url:url.url,
    time:moment(url.time).format('h:mm a')
  })
MESSAGE.insertAdjacentHTML('beforeend',html)  
const pageScroll=()=> {
  window.scrollBy(0,50);
  scrolldelay = setTimeout(pageScroll,10);
}
})
socket.on('roomdata',({room,users})=>{
  const html=Mustache.render(sidetemplate,{
    room,
    users
  })
  document.querySelector('#side').innerHTML=html
  const pageScroll=()=> {
    window.scrollBy(0,50);
    scrolldelay = setTimeout(pageScroll,10);
  }
})
MESSAGEFORM.addEventListener('submit',(e)=>{
    e.preventDefault()
   // MESSAGEFORMBUTTON.setAttribute('disabled','disabled')
    const message=document.querySelector('input').value
   //document.querySelector('input').value..e.target.elemets.message.value
    socket.emit('send',message,(error)=>{
     // MESSAGEFORMBUTTON.removeAttribute('disabled')
     MEASSAGEFORMINPUT.value=''
     MEASSAGEFORMINPUT.focus()
     
     if(error)
      {
        return console.log(error)
      }
        else
        {
       console.log('message was delivered')}
})
})
document.querySelector('#send-ADDHA').addEventListener('click',()=>
{
  if(!navigator.geolocation){
    return alert('your browser doesnot support geolocation..#sedlyf!!!')}
   else{
      navigator.geolocation.getCurrentPosition((position)=>{
       
      socket.emit('send-ADDHA',
      {latitude:position.coords.latitude,
      longitude:position.coords.longitude},()=>console.log('ADDHA shared!!'))
})
   }
})
socket.emit('join',{username,room},(error)=>{
  if(error)
  {
    alert(error)
    location.href='/'
  }
})