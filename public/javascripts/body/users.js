
let selectedId = 0;
let fieldsAllowedToChange = []; // empty for all


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
    $.ajax('./rest/User/all', {
        success: res => showUsers(res.items, res.props, res.editable),
        error: onError
    })
}

function userfieldToString(user, field) {
    const value = user[field];
    return (value === undefined) ? '' : value.toString();
}


function showUsers(users, props, editable) {

    let trs = '';
    users.forEach(user => {
        const id = user.id;
        trs += '<tr>';
        trs  += ('<td><input type="checkbox" class="checkthis"></td>');
        props.forEach(field => {
            trs  += ('<td>' + userfieldToString(user, field)  + '</td>');
        });
        if (editable) {
            trs  += ('<td><p data-placement="top" data-toggle="tooltip" title="" data-original-title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" onclick="onSelectId('+id+')"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
            trs  += ('<td><p data-placement="top" data-toggle="tooltip" title="" data-original-title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" onclick="onSelectId('+id+')"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
        }
        trs += '/<tr>';
    });
    const tbody = $('#usersTableBody');//.find('tbody');
    tbody.html(trs);
}

refreshUsers();