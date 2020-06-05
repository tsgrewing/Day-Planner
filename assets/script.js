// Set gloabal variables
var tasks = {
"9am":"",
"10am":"",
"11am":"",
"12pm":"",
"1pm":"",
"2pm":"",
"3pm":"",
"4pm":"",
"5pm":"",
};

loadTasks();
getTime();
function getTime() {
    $("#currentDay").html(moment().format('dddd , MMMM Do YYYY'));

    var currentHour = moment().format('H');
    console.log(currentHour);
    $('textarea').each(function () {
        var hourBlock = $(this).data("time");
        if (currentHour < hourBlock ) {
            $(this).addClass("future").removeClass("past present")
        }
        else if (currentHour > hourBlock) {
            $(this).addClass("past").removeClass("present future")
        }
        else {
            $(this).addClass("present").removeClass("past future")
        }
    });
};

// push anything typed into the text areas to the tasks object in the correct key
// $("textarea").on("focus", function(event){
//     $(event.target).on("keypress", function(){
//         tasks[event.target.id] = event.target.value;
//     });
// });
$(".saveBtn").on('click', function() {
    var time = $(this).prev('textarea').attr("id");
    var todo = $(this).prev('textarea').val();
    tasks[time] = todo;
    localStorage.setItem("savedtasks", JSON.stringify(tasks));
});

// function to load saved text area content from local memory when page is loaded
function loadTasks() {
    if (localStorage.getItem("savedtasks")) {
        tasks = JSON.parse(localStorage.getItem("savedtasks"));
        var textArea = $('textarea');
        for (var i=0;i < textArea.length;i++) {
            textArea[i].value = tasks[textArea[i].id];
            
        }
    }
};

setInterval(function () {
    getTime();
}, 60000);

// determine current hour and assign it to variable
// IF data-hour attrribute is less than current hour, add class "past" and remove present/future.
// IF data hour attribute is equal to current hour, add class "present" and remove past/future.
// IF data hour attribute is greater than current hour, add class "future" and remove past/present.