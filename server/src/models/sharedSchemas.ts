import { Schema, Types } from 'mongoose';

export interface Comment {
  message: string;
  createdBy: Types.ObjectId;
}

export const CommentSchema = new Schema<Comment>(
  {
    message: String,
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export type CriterionCategory = 'ecological' | 'social' | 'ownership' | 'overall';

export type CriterionTendency = 'pro' | 'contra';

const CriterionTendencySchemaType = {
  type: String,
  lowercase: true,
  enum: ['pro', 'contra'],
};

export type CriterionIndicator = 'hint' | 'sufficient';

export type CategorizedCriterion = {
  [key in CriterionCategory]: CriterionTendency;
};

export interface Criterion {
  /**
   * optional ID for criterion rating, e.g. 1.1, 1.2, 4.1, 4.2
   */
  id?: string;
  /**
   * Overall categories of sustainability
   */
  category: CriterionCategory;
  /**
   * For or against the criteria category stated
   */
  tendency: CriterionTendency;
  /**
   * Sufficient indicators goes to the final overall rating
   * while hints are display only
   */
  indicator: CriterionIndicator;
  description?: string;
  weighting?: number;
  info?: string;
}

/**
 * A type that helps write rule expressions so that they conform to an object
 * that evaluates to Criterion, then you can JSON.stringify the object.
 *
 * Mostly helpful for simple rules - if you need to evaluate it in context of
 * a scope, then variables in that scope is naturally not present while
 * writing the rule, so you'll need to write it in string format.
 */
export type RuleExpression = {
  [K in keyof Criterion]: any;
};

export const CriterionSchema = new Schema<Criterion>(
  {
    id: {
      type: String,
    },
    category: {
      required: true,
      type: String,
      lowercase: true,
      enum: ['ecological', 'social', 'ownership', 'overall'],
    },
    tendency: CriterionTendencySchemaType,
    indicator: {
      required: true,
      type: String,
      lowercase: true,
      enum: ['hint', 'sufficient'],
    },
    description: String,
    weighting: Number,
    info: String,
  },
  {
    timestamps: true,
  },
);

export type SustainabilityRating = 'unclear' | 'not sustainable' | 'sustainable' | 'very sustainable';

export type SustainabilityRuleApplied = 1 | 2 | 3 | 4;

export type SustainabilityRatingStatus = 'unrated' | 'in progress' | 'needs info' | 'needs agreement' | 'finished';

export interface EntityRating {
  comments?: Comment[];
  rating: SustainabilityRating;
  categoryRatings?: CategorizedCriterion;
  ruleApplied?: SustainabilityRuleApplied;
  createdAt?: Date;
  updatedAt?: Date;
  status: SustainabilityRatingStatus;
}

export const EntityRatingSchema = new Schema<EntityRating>(
  {
    comments: [CommentSchema],
    rating: {
      required: true,
      type: String,
      default: 'unclear',
      lowercase: true,
      enum: ['unclear', 'not sustainable', 'sustainable', 'very sustainable'],
    },
    categoryRatings: {
      type: new Schema<CategorizedCriterion>(
        {
          ecological: CriterionTendencySchemaType,
          social: CriterionTendencySchemaType,
          ownership: CriterionTendencySchemaType,
          overall: CriterionTendencySchemaType,
        },
        {
          _id: false,
        },
      ),
    },
    ruleApplied: {
      type: Number,
    },
    status: {
      required: true,
      type: String,
      default: 'unrated',
      lowercase: true,
      enum: ['unrated', 'in progress', 'needs info', 'needs agreement', 'finished'],
    },
  },
  {
    timestamps: true,
  },
);

export interface Rule {
  /**
   * Rule type that matches the rating field ruleType so that the expression
   * below can be applied to the rating.
   */
  type: string;
  /**
   * [math.js](https://mathjs.org/) expression evaluated in the context
   * of the raw input value of a rating.
   *
   * Should evaluate to an object that conforms to Criterion.
   */
  expression: string;
  /**
   * Optional description to explain how the rule works.
   */
  description?: string;
}

export const RuleSchema = new Schema<Rule>(
  {
    type: { type: String, required: true },
    expression: { type: String, required: true },
    description: { type: String },
  },
  {
    _id: false,
    timestamps: true,
  },
);
