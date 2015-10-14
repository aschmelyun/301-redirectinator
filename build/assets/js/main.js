var redirects = [];
var bulk_add = false;

$('#add_redirect').click(function(e) {
    e.preventDefault();
    
    var form_valid = true;
    var redirect_from = $('#url_from').val();
    var redirect_to = $('#url_to').val();
    var redirect_type = $('#redirect_type').val();
    
    $('input[type="text"], textarea.urls').each(function() {
        
        if($.trim($(this).val()).length == 0) {
            $(this).addClass('error');
            form_valid = false;
            
            console.log("Form Invalid");
        } else {
            $(this).removeClass('error');
            
            console.log("Form Valid");
        }
        
    });
    
    if(form_valid) {
        
        if(bulk_add) {
            
            var multiple_redirects_from = $('#multiple_url_from').val().split("\n");
            var multiple_redirects_to = $('#multiple_url_to').val().split("\n");
            
            $.each(multiple_redirects_from, function(i, item) {
               
                $('#redirect_table').append('<tr><td>' + multiple_redirects_from[i] + '</td><td>' + multiple_redirects_to[i] + '</td><td>' + redirect_type + '</td></tr>');
                redirects.push({
                    "redirect_from": multiple_redirects_from[i],
                    "redirect_to": multiple_redirects_to[i],
                    "type": redirect_type
                });
                
            });
            
        } else {
        
            $('#redirect_table').append('<tr><td>' + redirect_from + '</td><td>' + redirect_to + '</td><td>' + redirect_type + '</td></tr>');
            redirects.push({
               "redirect_from": redirect_from,
               "redirect_to": redirect_to,
               "type": redirect_type
            });
            
        }
        $('input[type="text"], textarea.urls').each(function() { $(this).val(''); });
    }
    
});

$('#bulk_add_urls').click(function(e) {
    e.preventDefault();
    
    var textarea_url_from = $('<textarea class="urls" id="multiple_url_from" placeholder="URLs To Redirect From"></textarea>');
    var textarea_url_to = $('<textarea class="urls" id="multiple_url_to" placeholder="URLs To Redirect To"></textarea>');
    var text_url_from = $('<input type="text" id="url_from" placeholder="Redirect From URL" />');
    var text_url_to = $('<input type="text" id="url_to" placeholder="Redirect To URL" />');
    
    if(bulk_add) {
        $('#multiple_url_from').replaceWith(text_url_from);
        $('#multiple_url_to').replaceWith(text_url_to);
        
        $(this).html('Bulk Add URLs');
        $('#add_redirect').html('Add Redirect');
        bulk_add = false;
    } else {
        $('#url_from').replaceWith(textarea_url_from);
        $('#url_to').replaceWith(textarea_url_to);
        
        $(this).html('Add Single URLs');
        $('#add_redirect').html('Add Redirects');
        bulk_add = true;
    }
   
});

$('#import_csv').click(function(e) {
    e.preventDefault();

    $('#modal_csv').fadeIn(250);
});

$('#parse_csv').click(function(e) {
    e.preventDefault();

    var redirect_type = $('#redirect_type').val();
    var csv_lines = $('#csv_code').val().split("\n");
    $.each(csv_lines, function(i, item) {
        var csv_items = csv_lines[i].split(',');

        $('#redirect_table').append('<tr><td>' + csv_items[0] + '</td><td>' + csv_items[1] + '</td><td>' + redirect_type + '</td></tr>');
        redirects.push({
            "redirect_from": csv_items[0],
            "redirect_to": csv_items[1],
            "type": redirect_type
        });
    });

    $('.modal').fadeOut(250);
});

$('#export_htaccess').click(function(e) {
    e.preventDefault();
    
    //console.log(redirects);
    $('#htaccess_code').html('');
    
    $.each(redirects, function(i, item) {
       $('#htaccess_code').append('Redirect ' + redirects[i].type + ' ' + redirects[i].redirect_from + ' ' + redirects[i].redirect_to + "\r\n"); 
    });
    
    $('#modal_htaccess').fadeIn(250);
});

$('.close-modal').click(function(e) {
    e.preventDefault();
    
    $('.modal').fadeOut(250);
});
