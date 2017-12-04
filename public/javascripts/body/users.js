
let selectedId = -1;

function onSelectId(id) {
    selectedId = id;
    $('.selected-id').text('' + id);
}

function onOpenDetailsModal(id) {
    onSelectId(id);

    $.ajax('./rest/User/' + id, {
       type: 'GET',
       error: onErrorResponse,
       success: res => showEditModal(res.item)
    });
}

function onDeleteClick(){
    $.ajax('./rest/User/' + selectedId, {
        type: "DELETE",
        success: refreshUsers,
        error: onErrorResponse
    });
}


function onErrorResponse (res) {
    console.error("error: " + res.responseText)
}

function refreshUsers() {
    $.ajax('./rest/User/all', {
        success: res => showUsers(res.items),
        error: onErrorResponse
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

function parseType(field) {
    switch (locals.props[field]){
        case "String":
            return "text";
        case "Integer":
            return "number";
        case "Array":
            return "list"
    }

}

function showEditModal(user) {
    const id = user ? user._id : 0;

    // set title and button text
    let actionName = id === 0 ? 'Add' : 'Update';
    $('#detailsModal').find('.modal-header').text(actionName + ' User');
    $('#detailsModalSubmitButton').text(actionName);

    // fill edit fields
    let html = '';
    Object.keys(locals.props).forEach(field => {
        const label = nameFromField(field);
        html += '<label for="' + 'input_' + field + '" >' + label + '</label>\n';
        const fieldType = locals.props[field];
        const value = user ? user[field] : (fieldType === "String") ? '' : (fieldType === "Number") ? 0 : [];
        if (locals.props[field] === "Array"){
            html += '<select class="selectpicker" multiple>\n';
            value.forEach(elem => {
                html += '<option value="elem">elem</option>'
            });
            html += '</select>'
        }else {
            html += '<input type="' + parseType(field) + '" id="input_' + field + '" class="form-control" name="' + field + '" placeholder="' + label + '" value="' + value + '" required autofocus/>\n';
        }
    });
    $('#detailsModelFields').html(html);

    // set submit action
    $('#detailsForm').submit(e => {
        const isNew = id === 0;
        const newUserData = $("#detailsForm").serialize();
        if (isNew) {
            $.ajax('./rest/User', {
                type: 'POST',
                error: function(x) { onErrorResponse(x) },
                success: function(){
                    $('#detailsModal').modal('toggle');
                    refreshUsers();
                },
                data : newUserData
            });
        } else {
            $.ajax('./rest/User/' + id, {
                type: 'PUT',
                error: onErrorResponse,
                success: function(){
                    $('#detailsModal').modal('toggle');
                    refreshUsers();
                },
                data: newUserData
            });
        }
        e.preventDefault();
    });

}

function showUsers(users) {

    let trs = '';
    users.forEach(user => {
        const id = user._id;
        trs += '<tr>';
        trs  += ('<td><input type="checkbox" class="checkthis"></td>');
        Object.keys(locals.props)
            .forEach(field => {
            trs  += ('<td>' + userfieldToString(user, field)  + '</td>');
        });
        if (locals.editable) {
            trs  += ('<td><p data-placement="top" data-toggle="tooltip" title="" data-original-title="Edit"><button class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#detailsModal" onclick="onOpenDetailsModal(\''+id+'\')"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
            trs  += ('<td><p data-placement="top" data-toggle="tooltip" title="" data-original-title="Delete"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" onclick="onSelectId(\''+id+'\')"><span class="glyphicon glyphicon-trash"></span></button></p></td>');
        }
        trs += '/<tr>';
    });
    const tbody = $('#usersTableBody');
    tbody.html(trs);
}

refreshUsers();

