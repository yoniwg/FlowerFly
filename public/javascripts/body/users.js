
//let selectedId;
function onSelectId(id) {
    selectedId = id;
    $('.selected-id').text('' + id);
}

function onDeleteClick(){
    const id = selectedId;
    $.ajax('./rest/User/' + id, {
        type: "DELETE",
        success: refreshUsers,
        error: onError
    });
}


function onError (x) {
    console.log(x.responseText)
}

function refreshUsers() {
    $.ajax('./rest/User', {
        success: showUsers,
        error: onError
    })
}

function onSelectId(id) {
    throw Error("not implemented")
}

function showUsers(users) {
    throw Error("not implemented")
    // TODO: define: props, editable.
    users.forEach(user => {
        const id = user.id;
        const tr = $('#usersTable').find('tbody').append('tr');
        tr.append('<td><input type="checkbox" class="checkthis"></td>');
        props.forEach(field => {
            tr.append('<td>' + obj[field] + '</td>');
        });
        if (editable) {
            tr.append('<td><p data-placement="top" data-toggle="tooltip" title="" data-original-title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" onclick="onSelectId('+id+')"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
            tr.append('<td><p data-placement="top" data-toggle="tooltip" title="" data-original-title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" onclick="onSelectId('+id+')"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
        }
    });
}