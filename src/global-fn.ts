import createLazyObject from "./LazyObject";
import ServiceRegistry from "./ServiceRegistry";

let serviceRegistry: ServiceRegistry

const _serviceProxyCache: Record<string, any> = {}

export function setServiceRegistry(registry: ServiceRegistry) {
    serviceRegistry = registry
}

export function getServiceSync<T>(serviceName: string): T {
    if (!_serviceProxyCache[serviceName]) {
        const lazyService = createLazyObject(`render service: ${serviceName}`, () => {
            return serviceRegistry.getService(serviceName)
        })
        _serviceProxyCache[serviceName] = lazyService
    }
    return _serviceProxyCache[serviceName]
}
