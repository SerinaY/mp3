

$('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
        event.stopPropagation();
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
    });
});
$('.route').on('click',function(){
    event.preventDefault();
})

function release(a, b) {
    return a.released.localeCompare(b.released);
}

function choose(s){
    if(s.localeCompare("Release")==0)
        return release;
    if(s.localeCompare("Title")==0)
        return title;
    if(s.localeCompare("Rating")==0)
        return rating;
    return rank;
}
function select(obj){
    if(!obj.hasOwnProperty("rank"))
        return false;
    var target=document.getElementById("query").value.toUpperCase();
    if(obj.title.toUpperCase().includes(target)||
        obj.released.toString().includes(target))
        return true;
    for(var i in obj.director){
        if(i.toString().includes(target))
            return true;
    }
    for(var i in obj.actors){
        if(i.toString().includes(target))
            return true;
    }
    return false;
}
function title(a, b) {
    return a.title.toString().localeCompare(b.title.toString());
}
function rating(a, b) {
    return a.imdbRating-b.imdbRating;
}


function rank(a, b) {
    return a.rank-b.rank;
}
