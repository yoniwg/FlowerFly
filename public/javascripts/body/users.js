
//let selectedId;
function onSelectId(id) {
    selectedId = id;
    $('.selected-id').text('' + id);
}
function onDeleteClick(){
    const id = selectedId;
    $.ajax({
        url: './rest/User/' + id,
        type: "DELETE",
        success: function () {
            refreshBody()
        },
        error: function (x) {
            console.log(x.responseText)
        }
    });
}