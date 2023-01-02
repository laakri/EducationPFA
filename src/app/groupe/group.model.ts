export interface Group {
  groupId: string;

  groupObject: string;
  groupCategory: string;
  teacherId: string;
  groupDescription: string;

  groupFilePath: string;

  groupPrice: string;
  groupLevel: string;
  groupStartDate: string;
  groupPeriode: string;
  groupHourPerWeek: string;

  groupExperienseNeed: string;
  groupExperienseGain: string;
  groupFuturesGain: string;

  groupDetails: string;
  createdAt: string;
  updatedAt: string;
}

export type GroupUsers = {
  _id: any;
  groupStartDate: any;
  groupPeriode: any;
  groupHourPerWeek: any;
  groupUsers: any;
  createdAt: any;
  updatedAt: any;
};
