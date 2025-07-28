import {LoggerFactory} from '@spring4js/log'

const logger = LoggerFactory.getLogger('LazyObject')
export default function createLazyObject(name: string, getObjectFn: () => any) {
    const _methodCache: Record<PropertyKey, any> = {}
    const _lazy = new Proxy(
        {},
        {
            get: (_target: any, propKey: PropertyKey) => {
                if (!_methodCache[propKey]) {
                    const fun = (...args: any[]): any => {
                        // 调用serviceName上的方法 propKey， 参数为args
                        const agent: any = getObjectFn()
                        if (!agent) {
                            throw new Error(`未找到被代理的对象 ${name} 调用${String(propKey)} ${args}`)
                        }
                        try {

                            const result = (agent[propKey] as any).apply(agent, args)
                            return result
                        } catch (err) {
                            logger.error(name, propKey, err)
                            throw err
                        }
                    }
                    _methodCache[propKey] = fun
                }
                return _methodCache[propKey]
            }
        }
    )
    return _lazy
}
