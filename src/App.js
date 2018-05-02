import React from 'react'
import './App.css';
import math from 'mathjs'

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: [],
      multiple: false,
      decimal: false,
      newOp: false,
      paren: false,
    }
  }

componentDidMount() {
    const butt = document.querySelectorAll('button')
    butt.forEach(x => {
      x.addEventListener('click', this.handleClick)
    })
    const del = document.getElementById('del')
    del.innerHTML = '<'
  }

handleClick = (e) => {
  let value = e.target.value;
  let display = this.state.display
  let multiple = this.state.multiple
  let decimal = this.state.decimal
  let newOp = this.state.newOp
  const disElement = document.getElementById('text')

    switch (value) {
      case 'clear':
        this.setState({
            display:[],
            multiple: false,
            decimal:false,
          });
      break;
      case '=':
        if(display.includes('(') ||
           display.includes(')')) {
             this.calculate();
             this.setState({
                decimal:false,
                newOp: false,
              })
            } else if (typeof display === 'string' ||
              isNaN(display.slice(-1)) === true) {
                this.setState({
                  display: [],
                })
           return;
           } else {
              this.calculate();
              this.setState({
                  decimal:false,
                  newOp: false,
               })
             }
      break;
      case '∆':
        if (typeof display === 'string') {
          return;
        } else if (display.length > 0
            && multiple===false && disElement.offsetWidth < 174
          ) {
              this.flip()
            } else {return;}
      break;
      case 'delete':
        if (typeof display === 'string') {
          this.setState({
            display: []
          })
          return;
        } else if (display.length === 1) {
            this.delete()
        } else {
            this.delete();
            this.setState({
              decimal:false
            })
          }
      break;
      case '+':
        if(typeof display === 'string') {
          return;
          } else if (multiple === false
              && display.length > 0 && disElement.offsetWidth < 174) {
                 let a = display.join("")
                 let b = Array.of(a)
                 display.length = 0
                 let c = display.push(b)
                 let d = display.push(value)
                  this.setState({
                    multiple: true,
                    display: display,
                    decimal: false,
                    newOp: true,
                  })
                }
      break;
      case '-':
        if (typeof display === 'string') {
            return;
            } else if (multiple === false
                && display.length > 0 && disElement.offsetWidth < 174
              ) {
                  let a = display.join("")
                  let b = Array.of(a)
                  display.length = 0
                  let c = display.push(b)
                  let d = display.push(value)
                    this.setState({
                        multiple:true,
                        display: display,
                        decimal: false,
                        newOp: true
                      })
                    }
      break;
      case '*':
        if(typeof display === 'string') {
           return;
           } else if (multiple === false
                && display.length > 0 && disElement.offsetWidth < 174
              ) {
                  let a = display.join("")
                  let b = Array.of(a)
                  display.length = 0
                  let c = display.push(b)
                  let d = display.push(value)
                    this.setState({
                      multiple: true,
                      display: display,
                      decimal: false,
                      newOp:true
                    })
                  }
      break;
      case '/':
        if(typeof display === 'string') {
           return;
           } else if (multiple === false
                && display.length > 0 && disElement.offsetWidth < 174
              ) {
                let a = display.join("")
                let b = Array.of(a)
                display.length = 0
                let c = display.push(b)
                let d = display.push(value)
                  this.setState({
                    multiple: true,
                    display: display,
                    decimal: false,
                    newOp:true
                  })
                }
      break;
      case '.':
        if(typeof display === 'string') {
           return;
         } else if(display.length > 0
                && decimal === false
                && disElement.offsetWidth < 174) {
                  let d = display.push(value)
                  this.setState({
                    decimal:true,
                    display:display,
                    multiple:true,
                    newOp:true
                  })
                } else {return;}
      break;
      default:
      if(disElement.offsetWidth >= 174) {
        this.setState({
          display: 'Chill Bro'
        })
      }
      else if (newOp === false) {
            this.setState({
              display: [value],
              newOp: true,
              })
            }
          else if (typeof display === 'string') {return;}
          else if (display.includes("0") &&
            display.length < 2 && value === '0' ) {return;}
            else if (value && disElement.offsetWidth < 174) {
              let d  = display.push(value)
                  this.setState({
                      display:display,
                      multiple:false,
                    })
                  } else if (disElement.offsetWidth >= 174) {
                      this.setState({
                          multiple:true,
                          decimal: true
                    })
                  }  else {return;}
                    break;
                    }
                  }

calculate = () => {
  let display = this.state.display
  let result = display.join("");
  let Answer = String(math.eval(result));
  let New = Array.from(Answer)

  function takeoff(value) {
    let a = value.filter(function(value) {
      return nope(value)
    })
    let b = a.join("")
    let c = b *= -1
    let d = Array.of(c)
    return d
  }

  function nope(value) {
      return value !== '(' && value !== ')'
      }

  function less(value) {
    return value.slice(0,12)
    }

  if (!result) {
        return;
      } else if(!isFinite(Answer)) {
        this.setState({
          display: 'Nah Homie'
          })
      } else if(display.includes('(')
          || display.includes(')')) {
          takeoff(display);
          this.setState({
            display: New
          })
          }
          else if(New.length > 10){
          this.setState({
            display: less(New)
          })
          }
        else if (result) {
          this.setState({
          display: New
          })
      } else {
          return;
      }
          this.setState({
          multiple:false
        })
      }

delete = () => {
  let value = this.state.display

  if(value.length === 0) return;
    else if(typeof value[0] === "string") {
        value.splice(-1,1);
        this.setState({
          display: value
            })
  } else if(value.length === 2) {
            let a = value[0].join('').split('')
            this.setState({
              display:a
            })
          }
  else if(value) {
      value.splice(-1,1);
      this.setState({
        display: value
        })
      } else{
        return;
      }
      this.setState({
        multiple: false
        })
        console.log(value)
      }

flip = () => {

  let display = this.state.display
  let reg = /\W/
  let specials = []
  let specs = display.filter(x => {
    if(reg.test(x) && typeof x === 'string') {
      specials.push(x)
      }
    })
  let disElement = document.getElementById('text')

  function combine(value) {
    let b = value.join("")
    let c = b *= -1
    let d = Array.of(c)

    if(value.includes('(') || value.includes(')')) {
        let a = takeoff(value)
        let f = a *= -1

          return f;
        } else {
          return d
        }
      }

  function takeoff(value) {
    let a = value.filter(x => {
      return x !== '(' && x !== ')'
    }).join("")
    let b = a *= -1
    let d = Array.of(a)

      return d
    }

  function paran(array,value) {

    if( value === -0 || isNaN(value) === true || value === 0 ) {
      let e = array.push('(', '-')
          return array;
        } else {
          let e = array.push('(', value, ')')

          return array
        }
      }

  function none(array,value) {
      array.push(value)

      return array
    }

  function add(value) {

    let a = value.filter(x => display.indexOf(x) > display.indexOf(specials[0]))

    let b = value.filter(x => display.indexOf(x) <= display.indexOf(specials[0]))

    //a is numbers to be paranthasized

    // b is everything before and including math signs

      if(a.includes('(') || a.includes(')')) {
       return none(b,takeoff(a))
        } else {
          return paran(b,combine(a))
          }
        }

  let a = add(display)

   if(specials.length > 0 && specials[0] !== '.' &&
       !specials.includes('.')) {
       this.setState({
         display: a
       })
     }
      else if(specials.length > 0 && specials[0] !== '.' &&
        specials.includes('.')) {
        this.setState({
          display: a,
          decimal: true
        })
      }  else if (display) {
        let c = combine(display);
        let e = display.length = 0
        let d = display.push(c);
          this.setState({
            display: display
          })
        } else {return;}
      }

render() {

      return (

        <div className='Calculator'>
        <div className = 'Display'>
        <div id= 'text'>{this.state.display}</div>
        </div>
        <div className = 'contain'>

        <button className = 'Button' value='clear'>C</button>
        <button className = 'Button' value='7'>7</button>
        <button className = 'Button' value='4'>4</button>
        <button className = 'Button' value='1'>1</button>
        <button className = 'Button' value='0'>0</button>
        <button className = 'Button' value='/'> / </button>
        <button className = 'Button' value='8'>8</button>
        <button className = 'Button' value='5'>5</button>
        <button className = 'Button' value='2'>2</button>
        <button className = 'Button' value='.'>.</button>
        <button className = 'Button' value='*'>*</button>
        <button className = 'Button' value='9'>9</button>
        <button className = 'Button' value='6'>6</button>
        <button className = 'Button' value='3'>3</button>

        <button className = 'Button' value='∆'>+/-</button>

        <button className = 'Button' value='delete' id = 'del'></button>
        <button className = 'Button' value='-'>-</button>
        <button className = 'Button' value='+'>+</button>
        <button className = 'Button' value='=' size = "2" >=</button>

        </div>
        </div>

      )
    }
  }

export default Calc;
