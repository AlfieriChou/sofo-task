import { Subcription, Schedule } from '@trapts/schedule'

export class TestSchedule implements Subcription {
  public static schedule(): Schedule {
    return {
      disable: false,
      cron: '1 * * * * *',
      env: 'development',
      timeZone: 'Asia/Shanghai'
    }
  }
  async subscribe(): Promise<void> {
    console.log('Hello World')
  }
}
