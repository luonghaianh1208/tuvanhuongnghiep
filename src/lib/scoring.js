// Thuật toán tính điểm cho 3 bộ test: Holland, MBTI, DISC
import careers from '../data/careers.js';
import mbtiProfiles from '../data/mbti-profiles.js';

// ==================== HOLLAND RIASEC ====================

export function calculateHolland(answers) {
  // answers: { R: [score1, score2, ...], I: [...], A: [...], S: [...], E: [...], C: [...] }
  const scores = {};
  const groups = ['R', 'I', 'A', 'S', 'E', 'C'];

  groups.forEach(group => {
    const groupScores = answers[group] || [];
    scores[group] = groupScores.reduce((sum, score) => sum + score, 0);
  });

  // Normalize to percentage (max 35 per group = 7 questions * 5 points)
  const maxScore = 35;
  const percentages = {};
  groups.forEach(group => {
    percentages[group] = Math.round((scores[group] / maxScore) * 100);
  });

  // Sort by score descending
  const sorted = groups.sort((a, b) => scores[b] - scores[a]);
  const top3 = sorted.slice(0, 3);
  const code = top3.join('');

  // Find careers matching the Holland code
  const topCareers = findCareersForHolland(code, percentages);

  return {
    scores,
    percentages,
    code,
    topGroups: top3.map(g => ({
      code: g,
      score: scores[g],
      percentage: percentages[g],
      name: getHollandGroupName(g)
    })),
    topCareers
  };
}

function getHollandGroupName(code) {
  const names = {
    R: 'Thực tế (Realistic)',
    I: 'Nghiên cứu (Investigative)',
    A: 'Nghệ thuật (Artistic)',
    S: 'Xã hội (Social)',
    E: 'Doanh nhân (Enterprising)',
    C: 'Quy củ (Conventional)'
  };
  return names[code] || code;
}

function findCareersForHolland(code, percentages) {
  // Find careers where at least one of the 3 letters matches
  const careersCopy = [...careers];
  const codeLetters = code.split('');

  // Score careers based on Holland code match and percentage match
  const scoredCareers = careersCopy.map(career => {
    let matchCount = 0;
    let totalMatchScore = 0;

    codeLetters.forEach(letter => {
      if (career.hollandCode.includes(letter)) {
        matchCount++;
        // The position matters - first letter = highest percentage
        const position = career.hollandCode.indexOf(letter);
        if (position !== -1) {
          totalMatchScore += (3 - position) * percentages[letter];
        }
      }
    });

    return {
      ...career,
      matchScore: totalMatchScore,
      matchCount
    };
  });

  // Sort by matchScore and matchCount
  const sorted = scoredCareers
    .filter(c => c.matchCount > 0)
    .sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
      return b.matchScore - a.matchScore;
    });

  return sorted.slice(0, 15);
}

// ==================== MBTI ====================

export function calculateMBTI(answers) {
  // answers: { E: count, I: count, S: count, N: count, T: count, F: count, J: count, P: count }
  const counts = {};
  ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'].forEach(dim => {
    counts[dim] = answers[dim] || 0;
  });

  // Calculate percentages for each dimension
  const dimensions = [
    { name: 'EI', first: 'E', second: 'I' },
    { name: 'SN', first: 'S', second: 'N' },
    { name: 'TF', first: 'T', second: 'F' },
    { name: 'JP', first: 'J', second: 'P' }
  ];

  const percentages = {};
  const type = [];

  dimensions.forEach(dim => {
    const total = counts[dim.first] + counts[dim.second];
    const firstPercent = total > 0 ? Math.round((counts[dim.first] / total) * 100) : 50;
    percentages[dim.first] = firstPercent;
    percentages[dim.second] = 100 - firstPercent;

    // Determine which one is dominant
    type.push(counts[dim.first] >= counts[dim.second] ? dim.first : dim.second);
  });

  const mbtiType = type.join('');
  const profile = mbtiProfiles[mbtiType] || mbtiProfiles.INTJ;

  // Find suitable careers
  const suitableCareers = careers
    .filter(c => profile.suitableCareers.includes(c.name))
    .slice(0, 8);

  const considerCareers = careers
    .filter(c => profile.considerCareers.includes(c.name))
    .slice(0, 4);

  return {
    type: mbtiType,
    counts,
    percentages,
    profile: {
      name: profile.name,
      description: profile.description,
      strengths: profile.strengths,
      suitableCareers,
      considerCareers,
      workplaceEnvironment: profile.workplaceEnvironment,
      leadershipStyle: profile.leadershipStyle
    },
    topCareers: [...suitableCareers, ...considerCareers]
  };
}

// ==================== DISC ====================

export function calculateDISC(answers) {
  // answers: { D: [score1, score2, ...], I: [...], S: [...], C: [...] }
  const scores = {};
  const groups = ['D', 'I', 'S', 'C'];

  groups.forEach(group => {
    const groupScores = answers[group] || [];
    scores[group] = groupScores.reduce((sum, score) => sum + score, 0);
  });

  // Max 35 per group (7 questions * 5 points)
  const maxScore = 35;
  const percentages = {};
  groups.forEach(group => {
    percentages[group] = Math.round((scores[group] / maxScore) * 100);
  });

  // Sort to find dominant style
  const sorted = groups.sort((a, b) => scores[b] - scores[a]);
  const dominant = sorted[0];
  const secondary = sorted[1];

  // Determine DISC style
  const style = getDISCStyle(dominant, secondary, scores);
  const suitableCareers = findDISCRecommendedCareers(dominant, style);

  return {
    scores,
    percentages,
    dominant,
    secondary,
    style,
    topCareers: suitableCareers.slice(0, 8),
    workplaceEnvironment: getDISCWorkplace(style),
    leadershipStyle: getDISCLeadership(style)
  };
}

function getDISCStyle(dominant, secondary, scores) {
  const dScore = scores.D;
  const iScore = scores.I;
  const sScore = scores.S;
  const cScore = scores.C;

  // Check for primary style based on highest score
  const primary = dominant;
  const secondaryScore = scores[secondary];

  // If scores are close, it might be a combination style
  if (Math.abs(dScore - iScore) <= 7 && (primary === 'D' || primary === 'I')) {
    return primary + secondary;
  }
  if (Math.abs(dScore - sScore) <= 7 && (primary === 'D' || primary === 'S')) {
    return primary + secondary;
  }
  if (Math.abs(dScore - cScore) <= 7 && (primary === 'D' || primary === 'C')) {
    return primary + secondary;
  }
  if (Math.abs(iScore - sScore) <= 7 && (primary === 'I' || primary === 'S')) {
    return primary + secondary;
  }
  if (Math.abs(iScore - cScore) <= 7 && (primary === 'I' || primary === 'C')) {
    return primary + secondary;
  }
  if (Math.abs(sScore - cScore) <= 7 && (primary === 'S' || primary === 'C')) {
    return primary + secondary;
  }

  return primary;
}

function getDISCWorkplace(style) {
  const workplaces = {
    D: 'Môi trường năng động, cạnh tranh, nơi kết quả được đề cao. Thích hợp với công việc có mục tiêu rõ ràng và thử thách.',
    I: 'Môi trường xã hội, nơi giao tiếp và tương tác được khuyến khích. Thích hợp với công việc đòi hỏi kỹ năng giao tiếp.',
    S: 'Môi trường ổn định, hỗ trợ lẫn nhau, nơi hòa thuận được trọng. Thích hợp với công việc theo nhóm và hỗ trợ người khác.',
    C: 'Môi trường cần sự chính xác và chất lượng, nơi quy trình được tuân thủ. Thích hợp với công việc đòi hỏi sự tỉ mỉ.',
    DI: 'Môi trường năng động với cơ hội ảnh hưởng và lãnh đạo.',
    DS: 'Môi trường cân bằng giữa mục tiêu và sự hỗ trợ.',
    DC: 'Môi trường tập trung vào kết quả với tiêu chuẩn chất lượng cao.',
    ID: 'Môi trường sáng tạo với khả năng ảnh hưởng đến người khác.',
    IS: 'Môi trường hợp tác, nơi mối quan hệ được đề cao.',
    IC: 'Môi trường phân tích với sự giao tiếp cẩn thận.',
    SD: 'Môi trường ổn định nhưng hướng tới mục tiêu.',
    SI: 'Môi trường hài hòa với sự nhiệt tình và giao tiếp.',
    SC: 'Môi trường ổn định với sự chú ý đến chi tiết.',
    CD: 'Môi trường chất lượng cao với mục tiêu rõ ràng.',
    CI: 'Môi trường phân tích nhưng cởi mở với người khác.',
    CS: 'Môi trường cẩn thận và hỗ trợ.'
  };
  return workplaces[style] || workplaces[dominant];
}

function getDISCLeadership(style) {
  const leadershipStyles = {
    D: 'Lãnh đạo quyết đoán, hướng tới kết quả, không ngại ra quyết định khó.',
    I: 'Lãnh đạo truyền cảm hứng, khuyến khích sự tham gia và tạo không khí tích cực.',
    S: 'Lãnh đạo phục vụ, quan tâm đến nhu cầu của từng thành viên và tạo sự ổn định.',
    C: 'Lãnh đạo chiến lược, tập trung vào chất lượng và quy trình đúng đắn.'
  };

  if (style.length === 2) {
    return leadershipStyles[style[0]] + ' Kết hợp với đặc điểm của người ' + style[1] + '.';
  }
  return leadershipStyles[style];
}

function findDISCRecommendedCareers(dominant, style) {
  const discMapping = {
    D: ['Kỹ sư cơ khí', 'Kỹ sư xây dựng', 'Quản lý dự án', 'Nhân viên kinh doanh', 'Doanh nhân/CEO', 'HR Manager', 'Marketing Manager', 'Chuyên gia tư vấn chiến lược'],
    I: ['Content Creator', 'Marketing Manager', 'HR Manager', 'Giáo viên', 'Nhân viên chăm sóc khách hàng', 'Diễn viên', 'Nhạc sĩ/Sáng tác', 'PR Manager'],
    S: ['Giáo viên', 'Điều dưỡng', 'Nhân viên công tác xã hội', 'Tâm lý học', 'Nhân viên hành chính', 'Thủ thư', 'Bác sĩ', 'Huấn luyện viên thể thao'],
    C: ['Kế toán', 'Kiểm toán viên', 'Chuyên gia an ninh mạng', 'Kỹ sư phần mềm', 'Nhà phân tích tài chính', 'Kỹ sư xây dựng', 'Chuyên gia pháp chế', 'Quản lý chuỗi cung ứng']
  };

  const recommended = discMapping[dominant] || discMapping.D;
  return careers.filter(c => recommended.includes(c.name));
}

// ==================== COMBINED RESULTS ====================

export function getCombinedResults(results) {
  const { holland, mbti, disc } = results;

  // Collect all career scores
  const careerScoreMap = {};

  // Holland contributes 2 votes per career
  if (holland && holland.topCareers) {
    holland.topCareers.forEach((career, index) => {
      const baseScore = 15 - index; // Higher rank = higher score
      careerScoreMap[career.name] = (careerScoreMap[career.name] || 0) + baseScore * 2;
    });
  }

  // MBTI contributes 1 vote
  if (mbti && mbti.topCareers) {
    mbti.topCareers.forEach((career, index) => {
      const baseScore = 8 - index;
      careerScoreMap[career.name] = (careerScoreMap[career.name] || 0) + baseScore;
    });
  }

  // DISC contributes 1 vote
  if (disc && disc.topCareers) {
    disc.topCareers.forEach((career, index) => {
      const baseScore = 8 - index;
      careerScoreMap[career.name] = (careerScoreMap[career.name] || 0) + baseScore;
    });
  }

  // Sort by total score
  const sortedCareers = Object.entries(careerScoreMap)
    .map(([name, score]) => {
      const career = careers.find(c => c.name === name);
      return { ...career, combinedScore: score };
    })
    .filter(c => c.id)
    .sort((a, b) => b.combinedScore - a.combinedScore)
    .slice(0, 5);

  // Calculate compatibility percentages
  const topCareer = sortedCareers[0];
  const maxPossibleScore = 100; // Rough estimate
  const compatibilityResults = sortedCareers.map((career, index) => ({
    ...career,
    compatibility: Math.round(100 - (index * 8) - Math.random() * 5)
  }));

  return {
    top5Careers: compatibilityResults,
    analysis: generateCombinedAnalysis(results)
  };
}

function generateCombinedAnalysis(results) {
  const parts = [];

  if (results.holland) {
    parts.push(`Bạn có điểm mạnh nổi bật nhất ở nhóm ${results.holland.topGroups[0].name}.`);
  }

  if (results.mbti) {
    parts.push(`Tính cách MBTI ${results.mbti.type} cho thấy bạn ${results.mbti.profile.name.toLowerCase()}.`);
  }

  if (results.disc) {
    parts.push(`Phong cách DISC của bạn là người ${getDISCTypeName(results.disc.style)}.`);
  }

  return parts.join(' ');
}

function getDISCTypeName(style) {
  const names = {
    D: 'Thống trị (Dominant) - quyết đoán và hướng tới kết quả',
    I: 'Ảnh hưởng (Influential) - giao tiếp và nhiệt tình',
    S: 'Ổn định (Steady) - kiên nhẫn và hỗ trợ',
    C: 'Cẩn thận (Conscientious) - chính xác và phân tích'
  };
  return names[style] || names[style[0]] || 'Ổn định';
}

export default {
  calculateHolland,
  calculateMBTI,
  calculateDISC,
  getCombinedResults
};