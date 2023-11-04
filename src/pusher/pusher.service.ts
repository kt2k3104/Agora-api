import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Pusher from 'pusher'

@Injectable()
export class PusherService {
  pusher: Pusher

  constructor(private configService: ConfigService) {
    this.pusher = new Pusher({
      appId: configService.get<string>('PUSHER_API_ID'),
      key: configService.get<string>('PUSHER_KEY'),
      secret: configService.get<string>('PUSHER_SECRET'),
      cluster: configService.get<string>('PUSHER_CLUSTER'),
      useTLS: true
    })
  }

  public trigger(channel: string, event: string, data: any) {
    this.pusher.trigger(channel, event, JSON.stringify(data))
  }
}
