<?php

namespace Database\Seeders;

use App\Models\Capability;
use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\LeadershipItem;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        Profile::query()->delete();
        Experience::query()->delete();
        Project::query()->delete();
        Skill::query()->delete();
        Education::query()->delete();
        Certification::query()->delete();
        LeadershipItem::query()->delete();
        Capability::query()->delete();

        $this->seedProfile();
        $this->seedExperiences();
        $this->seedProjects();
        $this->seedSkills();
        $this->seedEducation();
        $this->seedCertifications();
        $this->seedLeadership();
        $this->seedCapabilities();
    }

    private function seedProfile(): void
    {
        Profile::create([
            'name' => 'Adham Mansour',
            'photo_path' => '/images/adham-mansour.png',
            'title' => [
                'en' => 'AI Applications Lead · Full-Stack Engineer',
                'ar' => 'قائد تطبيقات الذكاء الاصطناعي · مهندس Full-Stack',
            ],
            'headline' => [
                'en' => 'I ship AI into real business systems — and build the products around them.',
                'ar' => 'بدمج الذكاء الاصطناعي في أنظمة الأعمال الحقيقية — وأبني المنتجات حولها.',
            ],
            'bio' => [
                'en' => 'Based in Mansoura, Egypt. I lead AI delivery at Al Badr Smart Systems, build full-stack products (Laravel, React, NestJS, Expo), and teach Python & AI. Recent work spans ERP OCR & RAG assistants, sole ownership of all AI in SECURESIST, a Gen Z life-organizer app (Nazm), fintech ops dashboards, and sports-academy platforms.',
                'ar' => 'مقيم في المنصورة، مصر. أقود تسليم حلول الذكاء الاصطناعي في شركة البدر، وأبني منتجات Full-Stack (Laravel وReact وNestJS وExpo)، وأدرّس Python والذكاء الاصطناعي. عملي الأخير يشمل OCR ومساعدات RAG في أنظمة ERP، والمسؤولية عن كل الذكاء الاصطناعي في تطبيق SECURESIST، وتطبيق نظم لتنظيم يوم جيل زد، ولوحات عمليات مالية، ومنصات أكاديميات رياضية.',
            ],
            'location' => 'Mansoura, Egypt · Hybrid / Remote',
            'email' => 'adhammansour500@gmail.com',
            'phone' => '01003891625',
            'linkedin' => 'https://www.linkedin.com/in/adham-mansour11/',
            'github' => 'https://github.com/Adhammansouri',
            'availability' => [
                'en' => 'Open to remote AI / full-stack roles and product collaborations.',
                'ar' => 'متاح لفرص عن بُعد في الذكاء الاصطناعي وFull-Stack وتعاونات المنتجات.',
            ],
        ]);
    }

    private function seedExperiences(): void
    {
        $items = [
            [
                'company' => 'Al Badr Smart Systems',
                'role' => [
                    'en' => 'Artificial Intelligence Team Leader & Backend Developer',
                    'ar' => 'قائد فريق الذكاء الاصطناعي ومطوّر Backend',
                ],
                'employment_type' => 'Full-time · Hybrid',
                'location' => 'Mansoura, Egypt',
                'starts_on' => '2024-05-01',
                'ends_on' => null,
                'is_current' => true,
                'sort_order' => 1,
                'bullets' => [
                    'en' => [
                        'Led the AI team shipping production features into AlBadr ERP: GPT-4o invoice OCR, financial analysis, and an in-app assistant.',
                        'Built backend APIs and reporting tied to accounting/warehouse data for automated insights.',
                        'Designed OCR quota billing with the Support Panel and a Cloudflare Workers RAG docs bot for ERP help.',
                        'Ran internal workshops training cross-department teams on practical AI tools.',
                    ],
                    'ar' => [
                        'قدت فريق الذكاء الاصطناعي لتسليم ميزات إنتاجية في نظام البدر: قراءة فواتير بـ GPT-4o، وتحليل مالي، ومساعد داخل التطبيق.',
                        'بنيت واجهات Backend وتقارير مربوطة ببيانات المحاسبة والمخازن لاستخراج رؤى آلية.',
                        'صمّمت نظام حصص OCR مع لوحة الدعم ومساعد وثائق RAG عبر Cloudflare Workers.',
                        'قدّمت ورش داخلية لتدريب الفرق على أدوات الذكاء الاصطناعي العملية.',
                    ],
                ],
            ],
            [
                'company' => 'Vosyn',
                'role' => [
                    'en' => 'Machine Learning Engineer',
                    'ar' => 'مهندس تعلّم آلي',
                ],
                'employment_type' => 'Part-time · Remote',
                'location' => 'Canada',
                'starts_on' => '2025-01-01',
                'ends_on' => null,
                'is_current' => true,
                'sort_order' => 2,
                'bullets' => [
                    'en' => [
                        'Assisted design and development of AI models and algorithms to improve system performance.',
                        'Preprocessed datasets for training and collaborated across teams to refine existing AI workflows.',
                        'Built AI content-generation workflows with LangChain / OpenAI for learning-platform materials.',
                    ],
                    'ar' => [
                        'ساهمت في تصميم وتطوير نماذج وخوارزميات ذكاء اصطناعي لتحسين أداء الأنظمة.',
                        'جهّزت مجموعات البيانات للتدريب وتعاونت مع الفرق لتحسين سير عمل الذكاء الاصطناعي.',
                        'بنيت مسارات توليد محتوى تعليمي بـ LangChain وOpenAI لمنصة التعلم.',
                    ],
                ],
            ],
            [
                'company' => 'STEM Club',
                'role' => [
                    'en' => 'Software Programming Instructor',
                    'ar' => 'مدرب برمجة',
                ],
                'employment_type' => 'Part-time · Remote',
                'location' => 'Nasr City, Egypt',
                'starts_on' => '2025-06-01',
                'ends_on' => null,
                'is_current' => true,
                'sort_order' => 3,
                'bullets' => [
                    'en' => [
                        'Designed beginner-friendly Python and AI courses with games and project-based learning.',
                        'Delivered workshops on data structures, logic building, and hands-on coding for students and career switchers.',
                    ],
                    'ar' => [
                        'صمّمت دورات Python وذكاء اصطناعي للمبتدئين عبر ألعاب ومشاريع عملية.',
                        'قدّمت ورشاً عن هياكل البيانات وبناء المنطق والبرمجة التطبيقية للطلاب ومغيّري المسار.',
                    ],
                ],
            ],
            [
                'company' => 'Grand Community',
                'role' => [
                    'en' => 'Data Analyst & Tech Lead',
                    'ar' => 'محلل بيانات وقائد تقني',
                ],
                'employment_type' => 'Full-time · On-site',
                'location' => 'Mansoura, Egypt',
                'starts_on' => '2024-02-01',
                'ends_on' => '2024-06-01',
                'is_current' => false,
                'sort_order' => 4,
                'bullets' => [
                    'en' => [
                        'Led technical development of internal tools that improved operational efficiency.',
                        'Built automated dashboards and reports with Excel and SQL for decision support.',
                    ],
                    'ar' => [
                        'قدت التطوير التقني لأدوات داخلية حسّنت كفاءة التشغيل.',
                        'بنيت لوحات وتقارير آلية بـ Excel وSQL لدعم القرار.',
                    ],
                ],
            ],
        ];

        foreach ($items as $item) {
            Experience::create($item);
        }
    }

    private function seedProjects(): void
    {
        $projects = require database_path('seeders/data/projects.php');

        foreach ($projects as $data) {
            $translations = $data['translations'];
            unset($data['translations']);
            $project = Project::create($data);
            foreach ($translations as $locale => $t) {
                $project->translations()->create(array_merge($t, ['locale' => $locale]));
            }
        }
    }

    private function seedSkills(): void
    {
        $skills = [
            ['group' => 'AI / ML', 'name' => 'OpenAI API', 'sort_order' => 1],
            ['group' => 'AI / ML', 'name' => 'Cloudflare Workers AI + Vectorize', 'sort_order' => 2],
            ['group' => 'AI / ML', 'name' => 'RAG Assistants', 'sort_order' => 3],
            ['group' => 'AI / ML', 'name' => 'LangChain', 'sort_order' => 4],
            ['group' => 'AI / ML', 'name' => 'Python · Scikit-learn', 'sort_order' => 5],
            ['group' => 'Backend', 'name' => 'Laravel 11/12', 'sort_order' => 1],
            ['group' => 'Backend', 'name' => 'NestJS · Prisma', 'sort_order' => 2],
            ['group' => 'Backend', 'name' => 'MySQL · SQL', 'sort_order' => 3],
            ['group' => 'Backend', 'name' => 'REST APIs · Sanctum/JWT', 'sort_order' => 4],
            ['group' => 'Frontend', 'name' => 'React 19 · Inertia', 'sort_order' => 1],
            ['group' => 'Frontend', 'name' => 'Expo · React Native', 'sort_order' => 2],
            ['group' => 'Frontend', 'name' => 'Tailwind CSS', 'sort_order' => 3],
            ['group' => 'Frontend', 'name' => 'TypeScript', 'sort_order' => 4],
            ['group' => 'Product', 'name' => 'ERP / CRM systems', 'sort_order' => 1],
            ['group' => 'Product', 'name' => 'Firebase · Electron', 'sort_order' => 2],
            ['group' => 'Product', 'name' => 'PWA · WhatsApp OTP', 'sort_order' => 3],
            ['group' => 'Data', 'name' => 'Power BI · Excel', 'sort_order' => 1],
            ['group' => 'Data', 'name' => 'Pandas · NumPy', 'sort_order' => 2],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }

    private function seedEducation(): void
    {
        Education::create([
            'institution' => [
                'en' => 'Arab Britain Open University (AOU)',
                'ar' => 'الجامعة العربية البريطانية المفتوحة',
            ],
            'degree' => [
                'en' => 'B.Sc. Artificial Intelligence & Data Science',
                'ar' => 'بكالوريوس الذكاء الاصطناعي وعلوم البيانات',
            ],
            'location' => 'New Cairo, Egypt',
            'starts_on' => '2021-09',
            'ends_on' => '2025-06',
            'notes' => null,
            'sort_order' => 1,
        ]);

        Education::create([
            'institution' => [
                'en' => 'Wichita State University',
                'ar' => 'جامعة ويتشيتا ستيت',
            ],
            'degree' => [
                'en' => 'Exchange — Computer Programming: Optimization for Engineers',
                'ar' => 'تبادل — برمجة الحاسوب: التحسين للمهندسين',
            ],
            'location' => 'Wichita, Kansas, USA',
            'starts_on' => '2023-09',
            'ends_on' => '2024-01',
            'notes' => null,
            'sort_order' => 2,
        ]);
    }

    private function seedCertifications(): void
    {
        $items = [
            [
                'title' => ['en' => 'HCIA–AI Certification (85%)', 'ar' => 'شهادة HCIA–AI (٪٨٥)'],
                'issuer' => ['en' => 'Huawei – NTI, Egyptian Talent Academy', 'ar' => 'هواوي – المعهد القومي للاتصالات'],
                'year' => '2025',
                'description' => [
                    'en' => '80-hour AI track: ML, deep learning, and applied problem-solving.',
                    'ar' => 'مسار ذكاء اصطناعي ٨٠ ساعة: تعلّم آلي وتعلّم عميق وتطبيقات عملية.',
                ],
                'sort_order' => 1,
            ],
            [
                'title' => ['en' => 'AI & Data Science — DEPI', 'ar' => 'الذكاء الاصطناعي وعلوم البيانات — DEPI'],
                'issuer' => ['en' => 'Digital Egypt Pioneers Initiative · MCIT', 'ar' => 'مبادرة روّاد مصر الرقمية · وزارة الاتصالات'],
                'year' => '2024–2025',
                'description' => [
                    'en' => 'Internship track focused on Python, SQL, modeling, and deployment.',
                    'ar' => 'تدريب عملي على Python وSQL والنمذجة والنشر.',
                ],
                'sort_order' => 2,
            ],
            [
                'title' => ['en' => 'Software Engineer Internship', 'ar' => 'تدريب مهندس برمجيات'],
                'issuer' => ['en' => 'Orange Digital Center', 'ar' => 'أورنج ديجيتال سنتر'],
                'year' => '2023',
                'description' => [
                    'en' => 'Desktop app development with C++, OOP, and design patterns.',
                    'ar' => 'تطوير تطبيقات سطح مكتب بـ C++ وOOP وأنماط التصميم.',
                ],
                'sort_order' => 3,
            ],
        ];

        foreach ($items as $item) {
            Certification::create($item);
        }
    }

    private function seedLeadership(): void
    {
        $items = [
            [
                'title' => ['en' => 'Innovation Ambassador', 'ar' => 'سفير الابتكار'],
                'organization' => ['en' => 'TIEC', 'ar' => 'مركز الإبداع التكنولوجي وريادة الأعمال'],
                'year' => '2024',
                'description' => [
                    'en' => 'Selected to promote technology-driven entrepreneurship in Egypt.',
                    'ar' => 'اختياري لتعزيز ريادة الأعمال التكنولوجية في مصر.',
                ],
                'sort_order' => 1,
            ],
            [
                'title' => ['en' => 'AI Core Team Member', 'ar' => 'عضو الفريق الأساسي للذكاء الاصطناعي'],
                'organization' => ['en' => 'Microsoft Student Club – AOU', 'ar' => 'نادي مايكروسوفت الطلابي – AOU'],
                'year' => '2023–2024',
                'description' => [
                    'en' => 'Lectured AI, DSA, and ML for 350+ undergraduates online and offline.',
                    'ar' => 'محاضرات في الذكاء الاصطناعي وهياكل البيانات وتعلّم الآلة لأكثر من ٣٥٠ طالباً.',
                ],
                'sort_order' => 2,
            ],
            [
                'title' => ['en' => 'Organizer — World Urban Forum 12', 'ar' => 'منظّم — المنتدى الحضري العالمي ١٢'],
                'organization' => ['en' => 'WUF12', 'ar' => 'WUF12'],
                'year' => '2024',
                'description' => [
                    'en' => 'Coordinated sessions on urban sustainability and youth engagement.',
                    'ar' => 'نسّقت جلسات حول الاستدامة الحضرية ومشاركة الشباب.',
                ],
                'sort_order' => 3,
            ],
        ];

        foreach ($items as $item) {
            LeadershipItem::create($item);
        }
    }

    private function seedCapabilities(): void
    {
        $items = [
            [
                'title' => [
                    'en' => 'AI inside business systems',
                    'ar' => 'ذكاء اصطناعي داخل أنظمة الأعمال',
                ],
                'description' => [
                    'en' => 'Vision OCR, financial LLM analysis, hybrid assistants, and RAG documentation bots wired into ERP workflows — plus sole ownership of every AI surface in the SECURESIST awareness platform.',
                    'ar' => 'قراءة فواتير بالرؤية، وتحليل مالي بالـ LLM، ومساعدات هجينة، وروبوتات وثائق RAG مربوطة بتدفّق عمل الـ ERP — مع المسؤولية عن كل الذكاء الاصطناعي في تطبيق SECURESIST.',
                ],
                'sort_order' => 1,
            ],
            [
                'title' => [
                    'en' => 'Laravel modular backends',
                    'ar' => 'خلفيات Laravel معيارية',
                ],
                'description' => [
                    'en' => 'Multi-tenant ERP modules, role portals, signed billing APIs, queues, and Hostinger-ready deploys.',
                    'ar' => 'وحدات ERP متعددة المستأجرين، بوابات أدوار، واجهات فوترة موقّعة، طوابير، ونشر جاهز لـ Hostinger.',
                ],
                'sort_order' => 2,
            ],
            [
                'title' => [
                    'en' => 'Product engineering end-to-end',
                    'ar' => 'هندسة منتجات من الطرف للطرف',
                ],
                'description' => [
                    'en' => 'From NestJS + Expo mobile (Nazm) to React/Firebase fintech ops and Electron desktop — shipped with brand, waitlists, and real users in mind.',
                    'ar' => 'من NestJS وExpo (نظم) إلى عمليات مالية بـ React/Firebase وسطح مكتب Electron — مع علامة تجارية وقوائم انتظار ومستخدمين حقيقيين.',
                ],
                'sort_order' => 3,
            ],
        ];

        foreach ($items as $item) {
            Capability::create($item);
        }
    }
}
