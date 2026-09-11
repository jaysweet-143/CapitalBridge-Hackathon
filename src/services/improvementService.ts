import { ImprovementPlanItem } from '../types';
import { mockImprovementPlan } from '../data/mockData';

class ImprovementService {
  private plan: ImprovementPlanItem[] = [...mockImprovementPlan];

  getPlan(): ImprovementPlanItem[] {
    const stored = localStorage.getItem('cb_improvement_plan');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return this.plan;
      }
    }
    return this.plan;
  }

  toggleTask(itemId: string, taskId: string): ImprovementPlanItem[] {
    const current = this.getPlan();
    const updated = current.map((item) => {
      if (item.id === itemId) {
        const tasks = item.tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const allCompleted = tasks.every((t) => t.completed);
        const noneCompleted = tasks.every((t) => !t.completed);
        return {
          ...item,
          tasks,
          status: allCompleted
            ? ('Completed' as const)
            : noneCompleted
            ? ('Open' as const)
            : ('In Progress' as const),
        };
      }
      return item;
    });

    localStorage.setItem('cb_improvement_plan', JSON.stringify(updated));
    return updated;
  }

  getOverallProgress(): number {
    const items = this.getPlan();
    let totalTasks = 0;
    let completedTasks = 0;
    items.forEach((item) => {
      item.tasks.forEach((t) => {
        totalTasks++;
        if (t.completed) completedTasks++;
      });
    });
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  }
}

export const improvementService = new ImprovementService();
