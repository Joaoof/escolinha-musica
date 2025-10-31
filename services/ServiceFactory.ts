import type { IStudentService } from "./interfaces/IStudentService"
import type { IAuthService } from "./interfaces/IAuthService"
import { MockStudentService } from "./implementations/MockStudentService"
import { HttpStudentService } from "./implementations/HttpStudentService"
import { MockAuthService } from "./implementations/MockAuthService"
import { HttpAuthService } from "./implementations/HttpAuthService"

type ServiceMode = "mock" | "http"

class ServiceFactory {
  private mode: ServiceMode

  constructor() {
    // Check environment variable to determine which implementation to use
    this.mode = (process.env.NEXT_PUBLIC_USE_MOCK_SERVICES as ServiceMode) === "mock" ? "mock" : "http"
  }

  getStudentService(): IStudentService {
    return this.mode === "mock" ? new MockStudentService() : new HttpStudentService()
  }

  getAuthService(): IAuthService {
    return this.mode === "mock" ? new MockAuthService() : new HttpAuthService()
  }

  setMode(mode: ServiceMode) {
    this.mode = mode
  }

  getMode(): ServiceMode {
    return this.mode
  }
}

export const serviceFactory = new ServiceFactory()
