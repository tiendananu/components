import get from 'lodash/get'
const config = JSON.parse(process.env.config)
export default {
  get: (field) => get(config, field),
  getModuleUrl: (mod) => {
    const url = get(config, `${mod}.url`) || 'http://localhost'
    const port = get(config, `${mod}.port`) || ''
    return port ? `${url}:${port}` : url
  }
}
