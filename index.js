const inputarea = $('#inputarea')
const properties = $('#properties')
const dialog_color = $('#dialog-color')

inputarea.sortable({
  addClasses: false,
  distance: 20,
  opacity: 0.9,
  revert: true,
})

inputarea.disableSelection()

$('#elements > span').click(function () {
  properties.empty()
  dialog_color.dialog('close')
  $('#inputarea > span').removeAttr('data-selected')
  inputarea.append('<span data-description="' + $(this).attr('data-description') + '">' + $(this).html() + '<i class="fa-minus"></i></span>')
  var new_element = $('#inputarea > span').last()
  new_element.disableSelection()
  new_element.click(function () {
    dialog_color.dialog('close')
    $('#inputarea > span').removeAttr('data-selected')
    new_element.attr('data-selected', 'true')
    updateProperties(new_element)
  })
  new_element.children('i').click(function () {
    dialog_color.dialog('close')
    $(this).parent().remove()
    updateProperties()
  })
})

function updateProperties(element) {
  properties.empty()

  if (!element) {
    return
  }

  properties.append('<h2>' + element.html().replace(/\s*<i.*<\/i>/gi, '') + '</h2 > ')
  properties.append('<p id="description">' + element.attr('data-description') + '</p>')

  properties.append('<label for="input-fg">FG Color</label><input id="input-fg"></input>')
  properties.append('<label for="input-bg">BG Color</label><input id="input-bg"></input>')

  $('#input-fg').click(function () {
    dialog_color.dialog('option', 'title', 'Foreground Color')
    dialog_color.dialog('open')
  })

  $('#input-bg').click(function () {
    dialog_color.dialog('option', 'title', 'Background Color')
    dialog_color.dialog('open')
  })

  $('#input-fg').change(function () {
    validateColors()
    if (!$(this).val()) {
      $(this).val('0, 0, 0')
    }
    $(this).css('border-left-color', 'rgb(' + $(this).val() + ')')
    $(this).attr('data-fg-color', $(this).val())
  })

  $('#input-bg').change(function () {
    validateColors()
    if (!$(this).val()) {
      $(this).val('0, 0, 0')
    }
    $(this).css('border-left-color', 'rgb(' + $(this).val() + ')')
    $(this).attr('data-bg-color', $(this).val())
  })

  if (element.attr('data-fg-color')) {
    $('#input-fg').val(element.attr('data-fg-color'))
    $('#input-fg').trigger('change')
  }

  if (element.attr('data-bg-color')) {
    $('#input-bg').val(element.attr('data-bg-color'))
    $('#input-bg').trigger('change')
  }
}

$('#dialog-color-container > span').click(function () {
  if (dialog_color.dialog('option', 'title') === 'Foreground Color') {
    $('#input-fg').val($(this).css('background-color').replace(/[rgb\(\)]/g, ''))
    $('#input-fg').css('border-left-color', 'rgb(' + $('#input-fg').val() + ')')
    $('#inputarea > span[data-selected=true]').attr('data-fg-color', $('#input-fg').val())
  } else if (dialog_color.dialog('option', 'title') === 'Background Color') {
    $('#input-bg').val($(this).css('background-color').replace(/[rgb\(\)]/g, ''))
    $('#input-bg').css('border-left-color', 'rgb(' + $('#input-bg').val() + ')')
    $('#inputarea > span[data-selected=true]').attr('data-bg-color', $('#input-bg').val())
  } else {
    alert('Could not set color')
  }
  dialog_color.dialog('close')
})

dialog_color.dialog({
  autoOpen: false,
  classes: {
    'ui-dialog': 'no-close'
  },
  draggable: false,
  height: 340,
  hide: { effect: "fade", duration: 100 },
  resizable: false,
  show: { effect: "fade", duration: 200 },
  width: 260
})

$('#dialog-color-container > span').each(function () {
  $(this).css('background-color', 'rgb(' + $(this).html() + ')')
  $(this).html('')
})

function validateColors() {
  var input_fg = $('#input-fg')
  var fg = input_fg.val()
  if (fg) {
    fg = fg.split(',')
    if (fg.length != 3) {
      input_fg.val('')
    } else {
      for (var i = 0; i < 3; i++) {
        if (parseInt(fg[i]) < 0 || parseInt(fg[i]) > 255 || isNaN(parseInt(fg[i]))) {
          input_fg.val('')
          break
        }
      }
    }
  }

  var input_bg = $('#input-bg')
  var bg = input_bg.val()
  if (bg) {
    bg = bg.split(',')
    if (bg.length != 3) {
      input_bg.val('')
    } else {
      for (var i = 0; i < 3; i++) {
        if (parseInt(bg[i]) < 0 || parseInt(bg[i]) > 255 || isNaN(parseInt(bg[i]))) {
          input_bg.val('')
          break
        }
      }
    }
  }
}
