const { step, mqSteps } = require('./docs-helper')

const docs = (radii, mqs) => `
/*

  BORDER RADIUS
  Docs: http://tachyons.io/docs/themes/border-radius/

  Base:
    br   = border-radius

  Modifiers:
    ${ radii.map((_, idx) => step({ zeroth: '/none', nth: 'scale' }, idx)).join('\n    ') }

  Literal values:
    -100 = 100%
    -pill = 9999px

  Media Query Extensions:
    ${mqSteps(mqs)}

*/`

const css = radii =>
  radii
    .map((radius, idx) => `.br${idx} { border-radius: ${radius}rem; }`)
    .concat([
      '.br-100 {     border-radius: 100%; }',
      '.br-pill {    border-radius: 9999px; }',
      `.br--bottom {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }`,
      `.br--top {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }`,
      `.br--right {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }`,
      `.br--left {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }`
    ])
    .join('\n')

module.exports = {
  css,
  docs
}
