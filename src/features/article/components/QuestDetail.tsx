import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconNotes } from '@tabler/icons-react';

import { Quest } from '../types';

import { QuestExample } from './QuestExample';

type Props = {
  data?: Quest;
};

export const QuestDetail: React.FC<Props> = ({ data }) => {
  function handleExample() {
    modals.open({
      title: 'Quest Example UI',
      children: <QuestExample data={data} />,
      size: 'lg',
    });
  }

  return (
    <section className="px-3 ">
      <div className="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-between gap-x-2">
        <h2>
          Quest Details <span className="text-blue-500">#{data?.questId}</span>
        </h2>
        <div className="flex-shrink-0">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconNotes size={14} />}
            onClick={() => handleExample()}
          >
            Example Quest
          </Button>
        </div>
      </div>
      <div className="grid gap-4 text-gray-700">
        {[
          { label: '_ID', value: data?._id },
          { label: 'Quest Name', value: data?.name },
          { label: 'Description', value: data?.description ?? '-' },
          { label: 'Quest Type', value: data?.type ?? '-' },
          { label: 'Tier', value: data?.tier ?? '-' },
          {
            label: 'Status',
            value: data?.status === null ? '-' : data?.status ? 'True' : 'False',
          },
          {
            label: 'Acceptable',
            value: data?.acceptable === null ? '-' : data?.acceptable ? 'True' : 'False',
          },
          { label: 'limit', value: data?.limit ?? '-' },
          { label: 'Category', value: data?.category ?? '-' },
          { label: 'POI', value: data?.poi?.length ? data.poi.join(', ') : '-' },
          {
            label: 'Start Quest',
            value: data?.start
              ? new Date(data.start).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : '-',
          },
          {
            label: 'End Quest',
            value: data?.end
              ? new Date(data.end).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : '-',
          },
          {
            label: 'Unlockable',
            value:
              data?.acceptable === null
                ? '-'
                : data?.unlockable
                  ? `True → Quest ID : ${data.qualification?.questId ?? '-'} | Level : ${data.qualification?.level ?? '-'}`
                  : 'False',
          },
          {
            label: 'Progression',
            value: data?.progression === null ? '-' : data?.progression ? 'True' : 'False',
          },
        ].map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="w-1/3 font-medium">{item.label}</span>
            <span className="w-1/12 text-center">:</span>
            <span className="w-1/2 font-light">{item.value}</span>
          </div>
        ))}
      </div>
      {/* Reward */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Rewards</h3>
        {data?.rewards && data.rewards.length > 0 ? (
          <ul className="pl-0 list-none text-gray-700 space-y-2">
            {data.rewards.map((reward, index) => (
              <li
                key={index}
                className="flex flex-col rounded-xl shadow-md border border-gray-400 p-3"
              >
                <span className="font-bold">{String(reward.rewardType)}</span>
                <span className="text-sm text-gray-600">Min Received : {reward.minReceived}</span>
                <span className="text-sm text-gray-600">Max Received : {reward.maxReceived}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No rewards available</p>
        )}
      </div>

      {/* Requirement */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
        {data?.requirements && data.requirements.length > 0 ? (
          <ul className="pl-0 list-none text-gray-700 space-y-2">
            {data.requirements.map((requirement, index) => (
              <li key={index} className="rounded-xl shadow-md border border-gray-400 p-3">
                <p className="font-medium text-gray-800">{requirement.type}</p>
                {requirement.description && (
                  <p className="text-sm text-gray-600">{requirement.description}</p>
                )}

                {/* Parameters */}
                {requirement.parameters && (
                  <ul className="mt-2 text-sm text-gray-700 space-y-1">
                    {requirement.parameters.twitterUsername && (
                      <li>Twitter Username: {requirement.parameters.twitterUsername}</li>
                    )}
                    {requirement.parameters.tweetId && (
                      <li>Tweet ID: {requirement.parameters.tweetId}</li>
                    )}
                    {requirement.parameters.requiredText && (
                      <li>Required Text: {requirement.parameters.requiredText}</li>
                    )}
                    {requirement.parameters.tutorialId && (
                      <li>Tutorial ID: {requirement.parameters.tutorialId}</li>
                    )}
                    {requirement.parameters.type && <li>Type : {requirement.parameters.type}</li>}
                    {requirement.parameters.count !== undefined && (
                      <li>Required Count: {requirement.parameters.count}</li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No requirements needed</p>
        )}
      </div>
    </section>
  );
};
