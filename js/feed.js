class Feed{
    constructor(){

    }
    config(){
        var foodRef= database.ref('food');
        foodRef.on("value", function(value){
            food= value.val();
        });
    }
    change(food){
        database.ref('/').update({
            food:food
        })
    }
}