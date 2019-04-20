import { Subcription, Schedule } from '@trapts/schedule'
import { knex } from '../database'
import * as moment from 'moment'

export class TestSchedule implements Subcription {
  public static schedule(): Schedule {
    return {
      disable: false,
      cron: '* * 9 * * 6',
      env: 'development',
      timeZone: 'Asia/Shanghai'
    }
  }
  async subscribe(): Promise<void> {
    console.log('Week report start...')
    const date = moment(new Date()).format('YYYY-MM-DD')
    const beforeWeekDate = moment(new Date(), 'YYYY-MM-DD').add(-7, 'days')
    const result = await knex('sofo_tasks')
      .leftJoin('sofo_users', 'sofo_tasks.user_id', 'sofo_users.id')
      .leftJoin('sofo_tags', 'sofo_tasks.tag_id', 'sofo_tags.id')
      .whereNull('sofo_tasks.deleted_at')
      .whereBetween('end_at', [
        beforeWeekDate + ' 00:00:00',
        date + ' 23:59:59'
      ])
      .select(
        'sofo_tasks.*',
        'sofo_users.username as username',
        'sofo_users.age as age',
        'sofo_users.description as user_description',
        'sofo_tags.tag as tag',
        'sofo_tags.description as tag_description'
      )
    console.log('----->', result)
    console.log('Week report done')
  }
}
