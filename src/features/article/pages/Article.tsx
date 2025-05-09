import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

// import { Category } from '@/features/category';
// import { Tag } from '@/features/tag';

import { ArticleTable } from '../components';
// import { ProductQuery } from '../types';

export const Article: React.FC = () => {
  // const [category, setCategory] = useState<string | null>(null);
  // const [tag, setTag] = useState<string | null>(null);

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Article Data</h1>
        <Button leftSection={<IconPlus />} component={Link} to="/article/create">
          Add
        </Button>
      </div>

      <section className="mb-4">
        <div className="grid grid-cols-12 gap-4">
          {/* <TextInput
            leftSection={<IconSearch size={16} />}
            placeholder="Search"
            className="col-span-6 md:col-span-3"
            value={search} // ✅ Ikat ke state search
            onChange={(e) => setSearch(e.currentTarget.value)} // ✅ Update state
          /> */}
          {/* <Select
            placeholder="Filter Category"
            className="col-span-6 md:col-span-3"
            data={Object.values(Category).map((type) => ({
              label: type,
              value: type,
            }))}
            value={category}
            onChange={setCategory}
          />
          <Select
            placeholder="Filter Tag"
            className="col-span-6 md:col-span-3"
            data={Object.values(Tag).map((type) => ({
              label: type, // Gunakan string dari enum sebagai label
              value: type, // Gunakan nilai enum sebagai value
            }))}
            required
            value={tag}
            onChange={setTag}
          /> */}
        </div>
      </section>

      <section className="mb-8">
        <ArticleTable
        // category={category} tag={tag}
        />
      </section>
    </main>
  );
};
