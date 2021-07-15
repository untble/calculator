const output = document.querySelector('.output');
const logs = document.querySelector('.logs');

const operators = { '/': '/', '*': '*', '+': '+', '-': '-' };

function evil(fn) {
  return new Function('return ' + fn)();
}


$(document).ready(() => {
  $('.symbol').click((event) => {
    const currentValue = event.target.value;
    if (output.value.slice(-1) in operators && currentValue in operators) {
      output.value = output.value.slice(0, -1) + currentValue;
    } else {
      output.value += currentValue;
    }
  });

  $('.clean').click(() => {
    output.value = '';
  });

  $('.calculate').click(() => {
    const expresion = output.value;

    const result = evil(output.value);

    if (expresion) {
      if (!isFinite(result)) {
        output.value = 'ERROR';
      } else {
        const div = document.createElement('div');
        
        div.innerHTML = `<span class='circle'></span> 
        <p>${output.value}=${result}</p> <span class='close'>&#10006;</span>`;
        logs.appendChild(div);

        output.value = result;

        $('.close').hover(
          function () {
            $(this).css('color', 'red');
          },
          function () {
            $(this).css('color', 'black');
          }
        );

        $('.circle').click(function () { 
            $(this).toggleClass('red')
        });

        $('.circle').hover(
          function () {
            $(this).css('border', '3px solid red');
          },
          function () {
            $(this).css('border', '3px solid black');
          }
        );

        $('.close').click(function () {
            $(this).closest('div').remove();
        })

        $('.logs div p').filter(function () {
            return this.innerHTML.match(/48/g)
        }).css('text-decoration', 'underline')
      }
    }
  });

  $('.logs').scroll(function () {
    console.log(`Scroll Top: ${$(this).scrollTop()}`);
  })
});
