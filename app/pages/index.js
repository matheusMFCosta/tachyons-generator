import React from 'react'

import isPresent from 'is-present'
import commaSplit from 'comma-split'

import conf from '../config'
const config = conf()

import Layout from '../components/layout'

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      config
    }
  }

  handleTypeScale (e, i) {
    const { config } = this.state
    const { typeScale } = config
    typeScale[i] = e.target.value

    const newConfig = Object.assign({}, config, { typeScale })
    this.setState({ config: newConfig })
  }

  handleColorRemove (name, val) {
    const { config } = this.state
    const { colors } = config

    const newColors = colors.filter(color => {
      const n = Object.keys(color)[0]

      return n !== name
    })
    
    const newConfig = Object.assign({}, config, { colors: newColors })
    this.setState({ config: newConfig })
  }

  handleColorAdd (name, val) {
    const { config } = this.state
    const { colors } = config

    const color = {}
    color[name] = val
    colors.push(color)

    const newConfig = Object.assign({}, config, { colors })
    this.setState({ config: newConfig })
  }

  render () {
    const { config } = this.state

    return (
      <Layout config={config}>
        <h1 className='pb4'>Tachyons Generator</h1>
        <h3 className='f6 ttu fw6 mb0 bb pb2'>Typography</h3>
        {config.typeScale.map((f, i) => (
          <div key={i}>
            <h4 className={`f${i + 1}`}>Heading {i + 1}</h4>
            <input
              value={config.typeScale[i]}
              onChange={e => this.handleTypeScale(e, i)}
            />
          </div>
        ))}
        <h3 className='f6 ttu fw6 mb0 mt5 bb pb2 mb1'>Colors</h3>
        <table className='border-collapse mid-gray f6' cellSpacing='0' cellPadding='0'>
          <tbody>
            {config.colors.map(color => {
              const name = Object.keys(color)[0]
              const value = color[name]

              return (
                <tr key={name}>
                  <td className={`bg-${name} pa2 bb`} style={{borderBottomColor: value}} />
                  <td className={`${name} bb b--near-white b f4 ph2`} children='Aa' />
                  <td className='bb b--near-white pa2'>
                    --{name}: {value};
                  </td>
                  <td
                    children='X'
                    className='bb b--near-white pa2 pointer'
                    onClick={() => this.handleColorRemove(name)}
                  />
                </tr>
              )
            })}
          </tbody>
        </table>
        <h3 className='f6 ttu fw6 mb0 mt5 bb pb2'>Config</h3>
        <pre children={JSON.stringify(config, null, 2)} className='bg-near-white pa2' />
      </Layout>
    )
  }
}
