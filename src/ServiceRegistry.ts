/**
 * 对话框服务注册窗口
 */
export default class ServiceRegistry {
  private serviceMap: Record<string, any>

  constructor() {
    this.serviceMap = {}
  }

  clear() {
    this.serviceMap = {}
  }
  registerServiceBatch(services: Record<string, any>) {
    this.serviceMap = { ...this.serviceMap, ...services }
  }
  registerService<T>(serviceName: string, service: T) {
    if (this.serviceMap[serviceName]) {
      throw new Error(`HostedDialogServiceRegistry 不允许重复注册: ${serviceName}`)
    }
    this.serviceMap[serviceName] = service
  }

  getService<T>(serviceName: string): T {
    if (!this.serviceMap[serviceName]) {
      throw new Error(`HostedDialogServiceRegistry 服务不存在: ${serviceName}`)
    }
    return this.serviceMap[serviceName]
  }

  hasService(serviceName: string): boolean {
    return !!this.serviceMap[serviceName]
  }
}
