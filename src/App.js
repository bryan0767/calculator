import React from 'react'
import './App.css';
import update from 'react-addons-update'
import math from 'mathjs'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: [],
      multiple: false,
      decimal: false,
      newOp: false,
      paren: false,
      count: 1
    }
  }

handleClick = (e) => {
  let value = e.target.value;
  let display = this.state.display
  let multiple = this.state.multiple
  let decimal = this.state.decimal
  let newOp = this.state.newOp
  let count = this.state.count

    switch (value) {
      case 'clear':
        this.setState({
            display:[],
            multiple: false,
            decimal:false,
            count: 1
          });
      break;
      case '=':
        if(display.includes('(') ||
           display.includes(')')) {
             this.calculate();
             this.setState({
                decimal:false,
                newOp: false,
                count: count
              })
            } else if (typeof display === 'string' ||
              isNaN(display.slice(-1)) === true) {
                this.setState({
                  display: [],
                  count:1
                })
           return;
           } else {
              this.calculate();
              this.setState({
                  decimal:false,
                  newOp: false,
                  count:count
               })
             }
      break;
      case '∆':
        if (typeof display === 'string') {
          return;
        } else if (display.length > 0
            && multiple===false ) {
              this.flip()
            } else {return;}
      break;
      case 'delete':
        if (typeof display === 'string') {
          return;
        } else if (display.length === 1) {
            this.delete();
            this.setState({
              count:1
            })
        } else {
            this.delete();
            this.setState({
              decimal:false,
              count: count - 1
            })
          }
      break;
      case '+':
        if(typeof display === 'string') {
          return;
          } else if (multiple === false
              && display.length > 0  && count <= 12) {
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
                    count: count + 1
                  })
                }
      break;
      case '-':
        if (typeof display === 'string') {
            return;
            } else if (multiple === false
                && display.length > 0  && count <= 12 ) {
                  let a = display.join("")
                  let b = Array.of(a)
                  display.length = 0
                  let c = display.push(b)
                  let d = display.push(value)
                    this.setState({
                        multiple:true,
                        display: display,
                        decimal: false,
                        newOp: true,
                        count: count + 1
                      })
                    }
      break;
      case '*':
        if(typeof display === 'string') {
           return;
           } else if (multiple === false
                && display.length > 0 && count <= 12) {
                  let a = display.join("")
                  let b = Array.of(a)
                  display.length = 0
                  let c = display.push(b)
                  let d = display.push(value)
                    this.setState({
                      multiple: true,
                      display: display,
                      decimal: false,
                      newOp:true,
                      count: count + 1
                    })
                  }
      break;
      case '/':
        if(typeof display === 'string') {
           return;
           } else if (multiple === false
                && display.length > 0 && count <= 12 ) {
                let a = display.join("")
                let b = Array.of(a)
                display.length = 0
                let c = display.push(b)
                let d = display.push(value)
                  this.setState({
                    multiple: true,
                    display:display,
                    decimal: false,
                    newOp:true
                  })
                }
      break;
      case '.':
        if(typeof display === 'string') {
           return;
         } else if(display.length > 0
                && decimal === false  && count <= 12 ) {
                  this.setState({
                    decimal:true,
                    display: update(display, {$push: [value]}),
                    multiple:true,
                    newOp:true
                  })
                } else {
                  return;
                }
      break;
      default:
        if (newOp === false) {
            this.setState({
              display: [value],
              newOp: true,
              count: 2
              })
            }
          else if (typeof display === 'string') {return;}
          else if (display.includes("0") &&
            display.length < 2 && value === '0' ) {return;}
            else if ( count <= 12 && value && display.length <= 12) {
                let a = display.push(value)
                  this.setState({
                      display:display,
                      multiple:false,
                      count: count + 1
                    })
                  } else if (display.length >= 12) {
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

  if(value) {
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
      }

flip = () => {

  let display = this.state.display

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

  function nope(value) {
        return value !== '(' && value !== ')'
    }

  function takeoff(value) {
    let a = value.filter(function(value) {
      return nope(value)
    })
    let b = a.join("")
    let c = b *= -1
    let d = Array.of(b)

    return d
  }

  function paran(array,value) {

    if( value == -0 || isNaN(value) === true || value == 0 ) {
      let e = array.push('(')
       let f = array.push('-')

          return array;
        } else {
          let e = array.push('(')
          let d = array.push(value)
          let f = array.push(')')

        return array
   }
  }

  function none(array,value) {
      let a = array.push(value)

      return array
    }

  function signs(value) {
      return value !== "*" && value !== "-"
      && value !== "+" && value !== "/"
    }

  function add(value) {
    let a = value.filter(function(value) {
      if(display.indexOf(value) > display.indexOf('+')) {
        return signs(value)
      }
    })

    let b = value.filter(function(value) {
    if(display.indexOf(value) <= display.indexOf('+')) {
          return value
        }
      })

      if(a.includes('(') || a.includes(')')) {
       return none(b,takeoff(a))
        } else {
          return paran(b,combine(a))
          }
        }

  function subtract(x) {
      let a = display.filter(function(value) {
      if(display.indexOf(value) > display.indexOf('-')) {
        return value
        }
      })
      let b = display.filter(function(value) {
      if(display.indexOf(value) <= display.indexOf('-')) {
        return value
          }
        })

        if(a.includes('(') && a.includes(')')) {
            return none(b,takeoff(a))
            } else {return paran(b,combine(a))}
         }

  function multiply(x) {
    let a = display.filter(function(value) {
    if(display.indexOf(value) > display.indexOf('*')) {
      return signs(value)
      }
    })
    let b = display.filter(function(value) {
    if(display.indexOf(value) <= display.indexOf('*')) {
      return value
        }
      })

      if(a.includes('(') && a.includes(')')) {
          return none(b,takeoff(a))
        } else {

          return paran(b,combine(a))}
        }

  function divide(x) {
          let a = display.filter(function(value) {
          if(display.indexOf(value) > display.indexOf('/')) {
            return value
            }
          })
          let b = display.filter(function(value) {
          if(display.indexOf(value) <= display.indexOf('/')) {
            return value
              }
            })
            if(a.includes('(') && a.includes(')')) {
                return none(b,takeoff(a))
                } else {return paran(b,combine(a))}
             }

  let a = add(display)
  let b = subtract(display)
  let c = multiply(display)
  let d = divide(display)

  if(display.includes('+')) {
        this.setState({
          display: a,
          decimal: true
        })
      }  else if (display.includes('-')) {
        this.setState({
          display: b,
          decimal:true
        })
      } else if (display.includes('*')) {
        this.setState({
          display: c,
          decimal:true
        })
      } else if (display.includes('/')) {
        this.setState({
          display: d,
          decimal:true
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
        <Display data={this.state.display}/>
        <Buttons>

        <Button value='clear' label='C' onClick={this.handleClick}/>
        <Button value='7' label='7' onClick={this.handleClick}/>
        <Button value='4' label='4' onClick={this.handleClick}/>
        <Button value='1' label='1' onClick={this.handleClick}/>
        <Button value='0' label='0' onClick={this.handleClick}/>
        <Button value='/' label='/' onClick={this.handleClick}/>
        <Button value='8' label='8' onClick={this.handleClick}/>
        <Button value='5' label='5' onClick={this.handleClick}/>
        <Button value='2' label='2' onClick={this.handleClick}/>
        <Button value='.' label='.' onClick={this.handleClick}/>
        <Button value='*' label='*' onClick={this.handleClick}/>
        <Button value='9' label='9' onClick={this.handleClick}/>
        <Button value='6' label='6' onClick={this.handleClick}/>
        <Button value='3' label='3' onClick={this.handleClick}/>

        <Button value='∆' label='+/-' onClick={this.handleClick}/>

        <Button value='delete' label='<' onClick={this.handleClick}/>
        <Button value='-' label='-' onClick={this.handleClick}/>
        <Button value='+' label='+' onClick={this.handleClick}/>
        <Button value='=' label='='  size = "2" onClick={this.handleClick}/>

        </Buttons>
        </div>

      )
    }
  }

class Display extends React.Component {
   render() {
     return(
       <div className="Display">{this.props.data}</div>
     )
    }
  }

class Buttons extends React.Component {
   render() {
     return (
       <div className="Buttons">{this.props.children}</div>
     )
   }
 }

class Button extends React.Component {
   render() {
     return (
       <button className="Button" value={this.props.value}
       onClick={this.props.onClick} size={this.props.size}>
       {this.props.label}
       </button>
     )
   }
 }

export default App;
