import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { SUBJECT_COLORS, CHART_COLORS } from '../../utils/constants';

/**
 * ExamChart - Renders line chart showing net score progression over time
 */
export function ExamProgressChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Görüntülenecek veri yok
      </div>
    );
  }

  const chartData = data.map((exam) => ({
    date: format(new Date(exam.date), 'dd MMM', { locale: tr }),
    fullDate: exam.date,
    net: exam.totalNet,
    name: exam.name,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
        <XAxis
          dataKey="date"
          stroke={CHART_COLORS.grid}
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke={CHART_COLORS.grid}
          style={{ fontSize: '12px' }}
          label={{ value: 'Net', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
          formatter={(value, name) => [value.toFixed(2), 'Net']}
          labelFormatter={(label, payload) => {
            if (payload && payload[0]) {
              return payload[0].payload.name;
            }
            return label;
          }}
        />
        <Line
          type="monotone"
          dataKey="net"
          stroke={CHART_COLORS.primary}
          strokeWidth={2}
          dot={{ fill: CHART_COLORS.primary, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

/**
 * SubjectComparisonChart - Bar chart comparing average nets by subject
 */
export function SubjectComparisonChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Görüntülenecek veri yok
      </div>
    );
  }

  // Calculate average net per subject
  const subjectAverages = {};
  const subjectCounts = {};

  data.forEach((exam) => {
    Object.entries(exam.results).forEach(([subject, result]) => {
      if (!subjectAverages[subject]) {
        subjectAverages[subject] = 0;
        subjectCounts[subject] = 0;
      }
      subjectAverages[subject] += result.net;
      subjectCounts[subject]++;
    });
  });

  const chartData = Object.keys(subjectAverages).map((subject) => ({
    subject,
    averageNet: subjectAverages[subject] / subjectCounts[subject],
    color: SUBJECT_COLORS[subject] || CHART_COLORS.primary,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
        <XAxis
          dataKey="subject"
          stroke={CHART_COLORS.grid}
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke={CHART_COLORS.grid}
          style={{ fontSize: '12px' }}
          label={{ value: 'Ortalama Net', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
          formatter={(value) => [value.toFixed(2), 'Ortalama Net']}
        />
        <Bar dataKey="averageNet" radius={[8, 8, 0, 0]}>
          {chartData.map((entry, index) => (
            <Bar key={`bar-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

/**
 * ExamDetailChart - Detailed breakdown of a single exam
 */
export function ExamDetailChart({ exam }) {
  if (!exam || !exam.results) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Görüntülenecek veri yok
      </div>
    );
  }

  const chartData = Object.entries(exam.results).map(([subject, data]) => ({
    subject,
    doğru: data.correct,
    yanlış: data.wrong,
    boş: data.empty,
    net: data.net,
    color: SUBJECT_COLORS[subject] || CHART_COLORS.primary,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
        <XAxis
          dataKey="subject"
          stroke={CHART_COLORS.grid}
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke={CHART_COLORS.grid}
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Bar dataKey="doğru" fill={CHART_COLORS.success} radius={[8, 8, 0, 0]} />
        <Bar dataKey="yanlış" fill={CHART_COLORS.error} radius={[8, 8, 0, 0]} />
        <Bar dataKey="boş" fill={CHART_COLORS.grid} radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default {
  ExamProgressChart,
  SubjectComparisonChart,
  ExamDetailChart,
};
