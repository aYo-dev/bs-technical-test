import { Injectable } from 'injection-js';
import { isEmpty, isEqual, mergeWith, reduce } from 'lodash';
import * as moment from 'moment';
import * as uuid from 'uuid/v4';
import { Qualification, User } from './user-repository.service';

@Injectable()
export class UserMerger {
    private getLaterQualification(q1: Qualification, q2: Qualification): Qualification {
        return moment(q1.expiry as string).isBefore(q2.expiry as string) ? q2 : q1;
    }

    private isDuplicated(q1: Qualification, q2: Qualification): boolean {
        return q1.type === q2.type;
    }

    private shouldPreserveQualification(q1: Qualification[], q2: Qualification[]): boolean {
        if (isEmpty(q1) || isEmpty(q2)) return false;

        return !isEqual(q1[0].uniqueId, q2[0].uniqueId) ||
            !this.isDuplicated(q1[0], q2[0]) ||
            !!(isEqual(q1[0].uniqueId, q2[0].uniqueId) && q1[0].expiry === null && q2[0].expiry);
    }

    private shouldUseLaterExpiryDate(q1: Qualification[], q2: Qualification[]): boolean {
        if (isEmpty(q1) || isEmpty(q2)) return false;

        return this.isDuplicated(q1[0], q2[0]) &&
            isEqual(q1[0].uniqueId, q2[0].uniqueId) &&
            !!(q1[0].expiry && q2[0].expiry);
    }

    private mergeQualifications(q1: Qualification[], q2: Qualification[]): Qualification[] {
        if (!q1.length && q2.length)
            return [{ ...q2[0], id: uuid() }];
        if (this.shouldPreserveQualification(q1, q2))
            return [...q1.map((el) => ({...el, id: uuid()})), {...q2[0], id: uuid() }];
        if (this.shouldUseLaterExpiryDate(q1, q2))
            return [{...this.getLaterQualification(q1[0], q2[0]), id: uuid()}];
        return [{ ...q1[0], id: uuid() }];
    }

    private mergeCb(valueOne: string | Qualification[], valueTwo: string | Qualification[], key: string): string | Qualification[] {
        // if main object value is empty should return source value
        if (isEmpty(valueOne)) return valueTwo;

        // merge qualifications logic
        if (key === 'qualifications') return this.mergeQualifications(valueOne as Qualification[], valueTwo as Qualification[]);

        // each user should have new id
        if (key === 'id') return uuid();

        // expand initials
        if (isEqual(valueOne.length, 1) && isEqual(valueOne[0], valueTwo[0])) return valueTwo;
        if (valueOne.length === 2 && valueOne[1] === '.' && valueOne[0] === valueTwo[0]) return valueTwo;

        return valueOne;
    }

    public merge(users: User[]): User {
        if (!users.length) throw new Error('There is something wrong with your data');
        if (users.length === 1) return users[0];

        return reduce(users, (acc: User, u: User, i: number, a: User[]) => {
            return mergeWith({...acc}, {...u}, this.mergeCb.bind(this));
        }, {} as User);
    }
}
