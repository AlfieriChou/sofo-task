import { TagService } from '../app/service/tag'
import { Container } from 'typedi'
import { UserService } from '../app/service/user'
import { TaskService } from '../app/service/task'

export interface IContainer {
  tag: TagService
  user: UserService
  task: TagService
}

export const container: IContainer = {
  tag: Container.get(TagService),
  user: Container.get(UserService),
  task: Container.get(TaskService)
}
