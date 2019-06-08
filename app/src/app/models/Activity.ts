export class Activity {
  id: number;
  categoryFk: number;
  date: string;
  category: string;
  organizerId: number;
  organizer: string;

  img: string;
  description: string;

  attendees: number;
  unknown: number;
  notAttending: number;

}
