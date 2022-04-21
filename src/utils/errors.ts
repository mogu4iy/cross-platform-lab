import Console from 'console';
import { Context } from 'telegraf';
import config from '../config';

export class CustomError extends Error {
  readonly custom: boolean = true;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

type THandler = Promise<any>

type TTelegrafHandlerArgument<TContext extends Context> = {
  ctx: TContext,
  next: () => Promise<void>,
}

type THandlerErrorArguments<TContext extends Context> =
  TTelegrafHandlerArgument<TContext>
  & { error: Error | CustomError }

const handleError = async <TContext extends Context>({
                                                       error,
                                                       ctx,
                                                       next
                                                     }: THandlerErrorArguments<TContext>): THandler => {
  Console.log('Error', error);
  if ('custom' in error) {
    return await ctx.reply('');
  }
  if (config.NODE_ENV === 'production') {
    return await ctx.reply('');
  }
  return await ctx.reply('');
};

type TDataType = object
type TDataFunctionType<TContext extends Context> = (ctx: TContext) => TDataType
type TPromiseHandlerArguments<TContext extends Context> = TTelegrafHandlerArgument<TContext>
  & { data: TDataType }
type TPromiseHandlerType<TContext extends Context> = ({
                                                        data,
                                                        ctx,
                                                        next
                                                      }: TPromiseHandlerArguments<TContext>) => THandler
type THandlerWrapperArguments<TContext extends Context> = {
  dataFunction: TDataFunctionType<TContext>,
  promiseHandler: TPromiseHandlerType<TContext>
}

export const handlerWrapper = <TContext extends Context>({
                                                           dataFunction,
                                                           promiseHandler
                                                         }: THandlerWrapperArguments<TContext>) => {
  return (ctx: TContext, next: () => Promise<void>) => {
    try {
      const promiseData = dataFunction(ctx);
      return promiseHandler({
        data: promiseData,
        ctx,
        next
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return handleError({
          error,
          ctx,
          next
        });
      }
    }
    return handleError({
      error: new Error('Interval server error'),
      ctx,
      next
    });
  };
};

export type {
  TDataFunctionType,
  TPromiseHandlerType
};

export default {
  CustomError,
  handleError,
  handlerWrapper
};
