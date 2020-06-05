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
// load saved tasks and run getTime function
loadTasks();
getTime();

// function to get time and update the styles of the time blocks accordingly
function getTime() {
    $("#currentDay").html(moment().format('dddd , MMMM Do YYYY'));

    var currentHour = moment().format('H');
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

// save anything entered into the text areas
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
// auto refresh the time every minute so the styles stay up to date
setInterval(function () {
    getTime();
}, 60000);
