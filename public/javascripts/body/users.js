
let selectedId = 0;
let fieldsAllowedToChange = []; // empty for all


function onSelectId(id) {
    selectedId = id;
    $('.selected-id').text('' + id);
}

function onOpenDetailsModal(id) {
    onSelectId(id);

    $.ajax('./rest/User/' + id, {
       type: 'GET',
       error: onError,
       success: res => showEditModal(res.item)
    });
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

function nameFromField(text) {
    var result = text.replace( /([A-Z])/g, " $1" );
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1); // capitalize the first letter - as an example.
    return finalResult;
}

function showEditModal(user) {
    const id = user ? user.id : 0;

    // set title and button text
    let actionName = id === 0 ? 'Add' : 'Update';
    $('#detailsModal').find('.modal-header').text(actionName + ' User');
    $('#detailsModalSubmitButton').text(actionName);

    // fill edit fields
    let html = '';
    fieldsAllowedToChange.forEach(field => {
        const label = nameFromField(field);
        html += '<label for="' + 'input_' + field + '" >' + label + '</label>\n';

        const value = user ? user[field] : '';
        html += '<input type="text" id="input_' + field + '" class="form-control" name="' + field  + '" placeholder="' + label + '" value="' + value + '" required autofocus></input>\n';
    });
    $('#detailsModelFields').html(html);

    // set submit action
    $('#detailsForm').submit(e => {
        const isNew = id === 0;
        const newUserDate = $("#detailsForm").serialize();
        if (isNew) {
            $.ajax('./User', {
                type: 'POST',
                error: onError,
                success: refreshUsers,
                data: newUserDate
            });
        } else {
            $.ajax('./User/' + id, {
                type: 'PUT',
                error: onError,
                success: refreshUsers,
                data: newUserDate
            });
        }
        e.preventDefault();
    });

}

function showUsers(users, props, editable) {

    fieldsAllowedToChange = props;

    let trs = '';
    users.forEach(user => {
        const id = user.id;
        trs += '<tr>';
        trs  += ('<td><input type="checkbox" class="checkthis"></td>');
        props.forEach(field => {
            trs  += ('<td>' + userfieldToString(user, field)  + '</td>');
        });
        if (editable) {
            trs  += ('<td><p data-placement="top" data-toggle="tooltip" title="" data-original-title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#detailsModal" onclick="onOpenDetailsModal('+id+')"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
            trs  += ('<td><p data-placement="top" data-toggle="tooltip" title="" data-original-title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" onclick="onSelectId('+id+')"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
        }
        trs += '/<tr>';
    });
    const tbody = $('#usersTableBody');
    tbody.html(trs);
}

refreshUsers();
