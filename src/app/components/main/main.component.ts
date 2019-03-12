import { Component, OnInit } from '@angular/core';
import { Section } from '../../models/section';
import { Column } from '../../models/column';
import { Card } from '../../models/card';
import { Label } from '../../models/label';
import { Chat } from '../../models/chat';
import { User } from '../../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  amir: User = new User('Amir');
  bot: User = new User('Bot');

  /**
   * List of sections
   */
  sections: Section[] = [
    new Section('Back-end'),
    new Section('Dashboard'),
    new Section('Landing Page'),
    new Section('Themes'),
    new Section('Emails'),
  ];

  /**
   * Selected section
   */
  section: Section = this.sections[1];

  /**
   * List of columns
   */
  columns: Column[] = [
    new Column('Backlog', [
      new Card('This is a card for this column.', [
        new Label('Urgent'),
        new Label('Component'),
      ]),
      new Card('Content of this card is important and needs to be looked at, actually no.', [
        new Label('Urgent'),
      ]),
      new Card('Wow so many cards here... Don\'t know what to do about em'),
      new Card('Small card here.'),
    ]),
    new Column('Do Me', [
      new Card('Wow so many cards here... Don\'t know what to do about em'),
      new Card('Small card here.'),
      new Card('This is a card for this column.', [
        new Label('Awesome'),
      ]),
    ]),
    new Column('Doing', [
      new Card('This is a card for this column.'),
      new Card('Content of this card is important and needs to be looked at, actually no.'),
      new Card('This is a card for this column.', [
        new Label('Not Important'),
      ]),
      new Card('Small card here.', [
        new Label('Important'),
      ]),
      new Card('Wow so many cards here... Don\'t know what to do about em'),
    ]),
    new Column('Hold'),
    new Column('Done'),
  ];

  /**
   * List of chats
   */
  chats: Chat[] = [
    new Chat(this.amir, 'This is a chat message.', new Date()),
    new Chat(this.bot, 'Something awesome goes here.', new Date()),
    new Chat(this.amir, 'Wow haha.', new Date()),
    new Chat(this.bot, 'This message is really long tho, really really long.', new Date()),
    new Chat(this.amir, 'This is a chat message.', new Date()),
    new Chat(this.bot, 'Something awesome goes here.', new Date()),
    new Chat(this.amir, 'Wow haha.', new Date()),
    new Chat(this.bot, 'This message is really long tho, really really long.', new Date()),
    new Chat(this.amir, 'This is a chat message.', new Date()),
    new Chat(this.bot, 'Something awesome goes here.', new Date()),
    new Chat(this.amir, 'Wow haha.', new Date()),
    new Chat(this.bot, 'This message is really long tho, really really long.', new Date()),
    new Chat(this.amir, 'This is a chat message.', new Date()),
    new Chat(this.bot, 'Something awesome goes here.', new Date()),
    new Chat(this.amir, 'Wow haha.', new Date()),
    new Chat(this.bot, 'This message is really long tho, really really long.', new Date()),
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
