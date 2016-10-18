

$('.route').on('click',function(){
    event.preventDefault();
})




function select(obj){

    var target=document.getElementById("query").value.toUpperCase();
    if(obj.title.toUpperCase().includes(target)||
        obj.released.toString().includes(target))
        return true;
    for(var i in obj.director){
        if(obj.director[i].toUpperCase().includes(target))
            return true;
    }
    for(var i in obj.actors){
        if(obj.actors[i].toUpperCase().includes(target))
            return true;
    }
    return false;
}

