import { Component, OnInit } from '@angular/core';
import { Section } from '../../models/section';
import { Column } from '../../models/column';
import { Card } from '../../models/card';
import { Label } from '../../models/label';
import { Chat } from '../../models/chat';
import { User } from '../../models/user';
import { Task } from '../../models/task';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /**
   * List of users in a dict
   */
  readonly users: { bot: User; amir: User } = {
    amir: new User('Amir'),
    bot: new User('Bot'),
  };

  /**
   * List of labels in a dict
   */
  readonly labels = {
    important: new Label('Important'),
    urgent: new Label('Urgent'),
    heavy: new Label('Heavy'),
    quickie: new Label('Quickie'),
  };

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
      new Card('This is a card for this column.', this.users.amir, [
        this.labels.important,
        this.labels.heavy,
      ]),
      new Card('Content of this card is important and needs to be looked at, actually no.', this.users.amir, [
        this.labels.urgent,
      ]),
      new Card('Wow so many cards here... Don\'t know what to do about em'),
      new Card('Small card here.'),
    ]),
    new Column('Do Me', [
      new Card('Wow so many cards here... Don\'t know what to do about em'),
      new Card('Small card here.'),
      new Card('This is a card for this column.', null, [
        this.labels.quickie,
      ]),
    ]),
    new Column('Doing', [
      new Card('This is a card for this column.'),
      new Card('Content of this card is important and needs to be looked at, actually no.'),
      new Card('This is a card for this column.', this.users.bot, [
        this.labels.important,
      ]),
      new Card('Small card here.', null, [
        this.labels.important,
        this.labels.quickie,
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
    new Chat(this.users.amir, 'This is a chat message.', new Date()),
    new Chat(this.users.bot, 'Something awesome goes here.', new Date()),
    new Chat(this.users.amir, 'Wow haha.', new Date()),
    new Chat(this.users.bot, 'This message is really long tho, really really long.', new Date()),
    new Chat(this.users.amir, 'This is a chat message.', new Date()),
    new Chat(this.users.bot, 'Something awesome goes here.', new Date()),
    new Chat(this.users.amir, 'Wow haha.', new Date()),
    new Chat(this.users.bot, 'This message is really long tho, really really long.', new Date()),
    new Chat(this.users.amir, 'This is a chat message.', new Date()),
    new Chat(this.users.bot, 'Something awesome goes here.', new Date()),
    new Chat(this.users.amir, 'Wow haha.', new Date()),
    new Chat(this.users.bot, 'This message is really long tho, really really long.', new Date()),
    new Chat(this.users.amir, 'This is a chat message.', new Date()),
    new Chat(this.users.bot, 'Something awesome goes here.', new Date()),
    new Chat(this.users.amir, 'Wow haha.', new Date()),
    new Chat(this.users.bot, 'This message is really long tho, really really long.', new Date()),
  ];

  /**
   * List of tasks
   */
  tasks: Task[] = [
    new Task('Do this task.'),
    new Task('A todo here to be done.'),
    new Task('This task is already done.', true),
    new Task('No this one is not done.'),
  ];

  /**
   * Show chats or tasks in the side
   */
  sideShow = 'chats';

  constructor() {
  }

  ngOnInit() {
  }
}
